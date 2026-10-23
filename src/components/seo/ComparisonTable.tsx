import React from 'react';
import { Check, X } from 'lucide-react';

interface ComparisonItem {
  feature: string;
  standard: string;
  engineered: string;
}

interface ComparisonTableProps {
  title: string;
  items: ComparisonItem[];
  engineeredHeader?: string;
  standardHeader?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  items,
  engineeredHeader = 'Engineered System (Sheharyar Siraj)',
  standardHeader = 'Standard / Off-The-Shelf Agency Setup'
}) => {
  return (
    <div className="my-10">
      <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-4">
        {title}
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-brand-border/60 glass-panel">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-brand-border bg-white/[0.03]">
              <th className="py-3.5 px-4 sm:px-6 text-brand-muted font-bold tracking-wider">
                ARCHITECTURAL CRITERIA
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-red-400 font-bold tracking-wider">
                {standardHeader}
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-accent font-bold tracking-wider bg-accent/[0.03]">
                {engineeredHeader}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/30">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-white">
                  {item.feature}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-brand-secondary">
                  <div className="flex items-start gap-2">
                    <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <span>{item.standard}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-white font-medium bg-accent/[0.02]">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-white">{item.engineered}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
