'use client';

import { Key } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';

export default function KeysPage() {
  const { apiKey } = useAuth();
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold">API Keys</h1>
        <p className="text-[13px] text-fabric-gray-500 mt-1">
          Manage authentication keys for the gateway API
        </p>
      </div>

      <div className="metric-card mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Key className="w-4 h-4" /> Current Session Key
        </h2>
        <div className="flex items-center gap-2 p-3 bg-fabric-gray-50 rounded-lg">
          <code className="flex-1 text-[12px] font-mono truncate">
            {showKey ? apiKey : `${apiKey?.slice(0, 12)}${'•'.repeat(24)}${apiKey?.slice(-4)}`}
          </code>
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-1.5 hover:bg-fabric-gray-200 rounded transition-colors"
          >
            {showKey ? <EyeOff className="w-4 h-4 text-fabric-gray-500" /> : <Eye className="w-4 h-4 text-fabric-gray-500" />}
          </button>
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-fabric-gray-200 rounded transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-fabric-gray-500" />}
          </button>
        </div>
      </div>

      <div className="metric-card mt-6">
        <h2 className="text-sm font-semibold mb-3">Usage</h2>
        <div className="space-y-2 text-[12px]">
          <div className="p-3 bg-fabric-gray-50 rounded-lg font-mono text-[11px]">
            <div className="text-fabric-gray-500"># Header authentication</div>
            <div>curl -H &quot;x-api-key: fab_sk_...&quot; https://api.fabriclayer.dev/v1/discover</div>
          </div>
        </div>
      </div>
    </div>
  );
}
