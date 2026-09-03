import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { 
    Download, X, CheckCircle2, Code,
    Copy, Clock, Activity, Server, CreditCard, ListTree, Braces, ChevronDown, ChevronRight, Search, FileText, Printer
} from 'lucide-react';

// ==========================================
// Syntax Highlighting Engine (Regex based)
// ==========================================
const syntaxHighlight = (json: string | object, search: string = '') => {
    if (typeof json !== 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    let highlightedJson = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    const highlightMatch = (text: string) => {
        if (!search) return text;
        const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-500/40 text-yellow-100 rounded-sm bg-transparent px-0">$1</mark>');
    };

    return highlightedJson.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-[#ce9178]'; // string
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-[#9cdcfe]'; // key
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-[#569cd6]'; // boolean
        } else if (/null/.test(match)) {
            cls = 'text-gray-500'; // null
        } else {
            cls = 'text-[#b5cea8]'; // number
        }
        return '<span class="' + cls + '">' + highlightMatch(match) + '</span>';
    });
};

// ==========================================
// Tree View Recursive Component
// ==========================================
const JsonTree = ({ data, search }: { data: any, search: string }) => {
    const Node = ({ nodeKey, value, isLast }: { nodeKey: string | null, value: any, isLast: boolean }) => {
        const [isExpanded, setIsExpanded] = useState(true);
        const isObject = value !== null && typeof value === 'object';
        const isArray = Array.isArray(value);
        
        const highlight = (text: string) => {
            if (!search) return text;
            const str = String(text);
            const idx = str.toLowerCase().indexOf(search.toLowerCase());
            if (idx === -1) return text;
            return (
                <React.Fragment>
                    {str.substring(0, idx)}
                    <mark className="bg-yellow-500/40 text-yellow-100 rounded-sm bg-transparent px-0">{str.substring(idx, idx + search.length)}</mark>
                    {str.substring(idx + search.length)}
                </React.Fragment>
            );
        };

        if (!isObject) {
            let colorCls = 'text-[#b5cea8]'; // number
            if (typeof value === 'string') colorCls = 'text-[#ce9178]';
            else if (typeof value === 'boolean') colorCls = 'text-[#569cd6]';
            else if (value === null) colorCls = 'text-gray-500';

            return (
                <div className="pl-4 font-mono text-[13px] leading-[1.6]">
                    {nodeKey && <span className="text-[#9cdcfe]">"{highlight(nodeKey)}"</span>}
                    {nodeKey && <span className="text-gray-400">:&nbsp;</span>}
                    <span className={colorCls}>
                        {typeof value === 'string' ? <span>"{highlight(value)}"</span> : highlight(String(value))}
                    </span>
                    {!isLast && <span className="text-gray-400">,</span>}
                </div>
            );
        }

        const keys = Object.keys(value);
        const brackets = isArray ? ['[', ']'] : ['{', '}'];

        return (
            <div className="font-mono text-[13px] leading-[1.6]">
                <div className="flex items-center cursor-pointer select-none hover:bg-white/[0.04] -ml-1 pl-1 rounded transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
                    <span className="w-4 inline-flex justify-center text-gray-500 hover:text-gray-300">
                        {isExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                        ) : (
                            <ChevronRight className="w-3 h-3" />
                        )}
                    </span>
                    {nodeKey && <span className="text-[#9cdcfe]">"{highlight(nodeKey)}"</span>}
                    {nodeKey && <span className="text-gray-400">:&nbsp;</span>}
                    <span className="text-gray-400">{brackets[0]}</span>
                    {!isExpanded && <span className="text-gray-500 px-1">...</span>}
                    {!isExpanded && <span className="text-gray-400">{brackets[1]}{!isLast ? ',' : ''}</span>}
                    {!isExpanded && keys.length > 0 && <span className="text-gray-500 text-[11px] ml-2 italic">{keys.length} items</span>}
                </div>
                {isExpanded && (
                    <div className="pl-4 border-l border-[#404040] ml-[7px]">
                        {keys.map((k, i) => (
                            <Node key={k} nodeKey={isArray ? null : k} value={value[k]} isLast={i === keys.length - 1} />
                        ))}
                    </div>
                )}
                {isExpanded && (
                    <div className="pl-4 -ml-4">
                        <span className="text-gray-400 ml-[15px]">{brackets[1]}{!isLast ? ',' : ''}</span>
                    </div>
                )}
            </div>
        );
    };

    return <div className="p-2 text-gray-300"><Node nodeKey={null} value={data} isLast={true} /></div>;
};

// ==========================================
// Main Component
// ==========================================
interface WebhookPayloadModalProps {
    show: boolean;
    onClose: () => void;
    payload: any;
}

export default function WebhookPayloadModal({ show, onClose, payload }: WebhookPayloadModalProps) {
    const [payloadViewMode, setPayloadViewMode] = useState<'raw' | 'tree'>('raw');
    const [payloadSearch, setPayloadSearch] = useState('');
    const [copiedPayload, setCopiedPayload] = useState(false);
    const [viewMode, setViewMode] = useState<'summary' | 'json'>('summary');

    if (!payload) return null;

    const getPayloadData = (payloadObj: any) => {
        if (!payloadObj) return null;
        return {
            event: payloadObj.status === 'success' ? 'charge.success' : (payloadObj.status === 'refunded' ? 'refund.created' : 'payment.failed'),
            id: payloadObj.transaction_id || `txn_sys_${payloadObj.id}`,
            amount: parseFloat(payloadObj.amount),
            currency: payloadObj.currency || 'LKR',
            created: Math.floor(new Date(payloadObj.created_at).getTime() / 1000),
            livemode: true,
            payment_method: payloadObj.payment_method || 'card',
            metadata: {
                booking_ref: `BKG-${payloadObj.booking_id}`,
                customer_email: payloadObj.booking?.tourist?.email || 'N/A',
                merchant_account: payloadObj.booking?.business?.owner?.email || 'N/A'
            }
        };
    };

    const handleCopyJSON = () => {
        const payloadData = getPayloadData(payload);
        if (!payloadData) return;
        navigator.clipboard.writeText(JSON.stringify(payloadData, null, 2));
        setCopiedPayload(true);
        setTimeout(() => setCopiedPayload(false), 2000);
    };

    const handleDownloadJSON = () => {
        const payloadData = getPayloadData(payload);
        if (!payloadData) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payloadData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${payloadData.id}_payload.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setPayloadSearch('');
            setPayloadViewMode('raw');
            setViewMode('summary');
        }, 300);
    };

    const payloadData = getPayloadData(payload);
    const eventId = payloadData?.id || 'Unknown';
    const timestamp = payload?.updated_at ? new Date(payload.updated_at).toISOString() : new Date().toISOString();

    return (
        <Modal show={show} onClose={handleClose} maxWidth="3xl">
            <div className="flex flex-col max-h-[90vh]">
                <div className="p-6 pb-0 shrink-0">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center font-sansDisplay tracking-tight">
                                <FileText className="w-5 h-5 mr-2 text-royalMaroon-600" />
                                Transaction Details
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 font-medium">
                                Event ID: <span className="text-gray-900">{eventId}</span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {viewMode === 'json' ? (
                                <>
                                    <button 
                                        onClick={handleDownloadJSON}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalMaroon-500 transition-colors shadow-sm"
                                        title="Download JSON file"
                                    >
                                        <Download className="w-4 h-4 mr-1.5 text-gray-400" />
                                        Download
                                    </button>
                                    <button 
                                        onClick={handleCopyJSON}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalMaroon-500 transition-colors shadow-sm"
                                        title="Copy to clipboard"
                                    >
                                        {copiedPayload ? <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-500" /> : <Copy className="w-4 h-4 mr-1.5 text-gray-400" />}
                                        {copiedPayload ? 'Copied!' : 'Copy JSON'}
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => window.print()}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalMaroon-500 transition-colors shadow-sm"
                                    title="Print Receipt"
                                >
                                    <Printer className="w-4 h-4 mr-1.5 text-gray-400" />
                                    Print Receipt
                                </button>
                            )}
                            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-md hover:bg-gray-100 ml-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 shadow-sm" title="Timestamp">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                            {timestamp}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border shadow-sm ${
                            payload.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                            payload.status === 'refunded' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-700 border-red-200'
                        }`} title="Event Type">
                            <Activity className={`w-3.5 h-3.5 mr-1.5 ${
                                payload.status === 'success' ? 'text-green-500' :
                                payload.status === 'refunded' ? 'text-yellow-500' :
                                'text-red-500'
                            }`} />
                            {payload.status === 'success' ? 'charge.success' : (payload.status === 'refunded' ? 'refund.created' : 'payment.failed')}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border shadow-sm ${
                            payload.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                            payload.status === 'refunded' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-700 border-red-200'
                        }`} title="Status Code">
                            <Server className={`w-3.5 h-3.5 mr-1.5 ${
                                payload.status === 'success' ? 'text-green-500' :
                                payload.status === 'refunded' ? 'text-yellow-500' :
                                'text-red-500'
                            }`} />
                            {payload.status === 'success' ? 'HTTP 200 OK' : (payload.status === 'refunded' ? 'HTTP 400 Bad Request' : 'HTTP 500 Error')}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-sm" title="Gateway">
                            <CreditCard className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                            {payload.gateway ? payload.gateway.charAt(0).toUpperCase() + payload.gateway.slice(1) : 'System'}
                        </span>
                    </div>

                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setViewMode('summary')}
                            className={`pb-2 px-4 text-sm font-medium transition-colors border-b-2 ${
                                viewMode === 'summary' 
                                    ? 'border-royalMaroon-600 text-royalMaroon-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Summary View
                        </button>
                        <button
                            onClick={() => setViewMode('json')}
                            className={`pb-2 px-4 text-sm font-medium transition-colors border-b-2 ${
                                viewMode === 'json' 
                                    ? 'border-royalMaroon-600 text-royalMaroon-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Raw JSON View
                        </button>
                    </div>

                    {viewMode === 'json' && (
                        <div className="flex justify-between items-center mb-3">
                            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                                <button 
                                    onClick={() => setPayloadViewMode('raw')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center ${payloadViewMode === 'raw' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Braces className="w-3.5 h-3.5 mr-1.5" />
                                    Formatted
                                </button>
                                <button 
                                    onClick={() => setPayloadViewMode('tree')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center ${payloadViewMode === 'tree' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <ListTree className="w-3.5 h-3.5 mr-1.5" />
                                    Tree View
                                </button>
                            </div>
                            
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search JSON..." 
                                    value={payloadSearch}
                                    onChange={(e) => setPayloadSearch(e.target.value)}
                                    className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-royalMaroon-500 focus:border-royalMaroon-500 w-48 shadow-sm transition-all outline-none"
                                />
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="px-6 overflow-hidden flex flex-col min-h-0 shrink-0 relative">
                    {viewMode === 'summary' ? (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4 flex-1 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Total Amount</p>
                                    <div className="text-3xl font-bold text-gray-900">
                                        {new Intl.NumberFormat('en-US').format(payloadData.amount)} {payloadData.currency}
                                    </div>
                                </div>
                                {payloadData.livemode && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                        <Activity className="w-3.5 h-3.5 mr-1.5" />
                                        Live Transaction
                                    </span>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Booking Reference</p>
                                    <p className="text-base font-semibold text-gray-900">{payloadData.metadata.booking_ref}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Payment Method</p>
                                    <div className="flex items-center text-base font-semibold text-gray-900">
                                        <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                                        <span className="capitalize">{payloadData.payment_method}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Customer Email</p>
                                    <p className="text-base font-semibold text-gray-900">{payloadData.metadata.customer_email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Merchant Account</p>
                                    <p className="text-base font-semibold text-gray-900">{payloadData.metadata.merchant_account}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#1e1e1e] rounded-xl border border-gray-700 shadow-lg overflow-hidden flex flex-col shrink-0 flex-1 min-h-[300px]">
                            <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#404040] shrink-0">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                                </div>
                                <span className="ml-4 text-[11px] font-mono font-semibold text-gray-400 tracking-wider">PAYLOAD.JSON</span>
                            </div>
                            <div className="p-4 overflow-y-auto max-h-[450px] custom-scrollbar text-[13px] leading-[1.6]">
                                {payloadViewMode === 'tree' ? (
                                    <JsonTree data={payloadData} search={payloadSearch} />
                                ) : (
                                    <div className="font-mono">
                                        {syntaxHighlight(payloadData, payloadSearch).split('\n').map((line, i) => (
                                            <div key={i} className="flex hover:bg-white/[0.04] px-2 -mx-2 rounded transition-colors group">
                                                <span className="w-8 text-right pr-4 text-[#858585] select-none border-r border-[#404040] mr-4 shrink-0 group-hover:text-gray-400 transition-colors">{i + 1}</span>
                                                <span className="whitespace-pre-wrap break-all" dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 mt-6 border-t border-gray-200 bg-gray-50 flex justify-end shrink-0 rounded-b-lg">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalMaroon-500 shadow-sm transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}
