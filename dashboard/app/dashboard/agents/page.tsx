'use client';

import { Wallet } from 'lucide-react';

export default function AgentsPage() {
  return (
    <div className="text-center py-16">
      <Wallet className="w-10 h-10 text-fabric-gray-300 mx-auto mb-3" />
      <div className="text-[13px] text-fabric-gray-500 mb-1">Agents &amp; Wallets</div>
      <div className="text-[11px] text-fabric-gray-400">
        Managed USDC wallets on Base for your agents — coming soon
      </div>
    </div>
  );
}
