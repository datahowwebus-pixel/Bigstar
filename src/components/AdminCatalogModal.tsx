import React, { useEffect, useState } from 'react';
import { Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { DIVISIONS, DivisionId, SampleProduct } from '../data/catalog';

interface AdminCatalogModalProps {
  isOpen: boolean;
  products: SampleProduct[];
  onClose: () => void;
  onAddProduct: (product: SampleProduct) => void;
  onDeleteProduct: (id: string) => void;
  onResetDefaults: () => void;
}

export const AdminCatalogModal: React.FC<AdminCatalogModalProps> = ({
  isOpen,
  products,
  onClose,
  onAddProduct,
  onDeleteProduct,
  onResetDefaults,
}) => {
  const [divisionId, setDivisionId] = useState<DivisionId>('sportswear');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [specWeight, setSpecWeight] = useState('220 GSM');
  const [materials, setMaterials] = useState('Technical Polyester, Reinforced Seam');
  const [sizes, setSizes] = useState('S, M, L, XL, 2XL');
  const [summary, setSummary] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedDivision = DIVISIONS.find((d) => d.id === divisionId) || DIVISIONS[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      setFormError('Please provide both a product title and reference code.');
      return;
    }
    setFormError('');

    const newProduct: SampleProduct = {
      id: `prod-${Date.now()}`,
      code: code.trim().toUpperCase(),
      divisionId,
      subcategory: subcategory.trim() || selectedDivision.subcategories[0].title,
      name: name.trim(),
      summary:
        summary.trim() ||
        'Custom export-grade apparel engineered to international OEM and private-label standards.',
      image: selectedDivision.heroImage,
      sizes: sizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      materials: materials
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
      specWeight: specWeight.trim() || 'Standard Export',
      moq: '50 Units / Style',
      customization: ['Private Label', 'OEM Sizing', 'Custom Colorway'],
      oemAvailable: true,
      galleryViews: [
        { label: 'Studio View', caption: 'Full specimen presentation', cropPosition: 'center center', scale: 1 },
        { label: 'Surface Detail', caption: 'Close-up weave & finish', cropPosition: '45% 45%', scale: 1.75 },
      ],
    };

    onAddProduct(newProduct);
    setName('');
    setCode('');
    setSummary('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071121]/75 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white border border-[#0A1628]/15 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A1628] text-white">
          <div>
            <p className="font-mono-tabular text-[11px] text-[#E5C883]">
              Bigstar Industries · Catalog Studio
            </p>
            <h2 id="admin-modal-title" className="font-display text-lg md:text-xl font-medium">
              Manage Product Listings
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-white border border-white/20 rounded-sm transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C6A253]" />
              <span>Reset Samples</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close catalog manager"
              className="p-1.5 text-white/75 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Add Product Form */}
          <form
            onSubmit={handleCreate}
            className="lg:col-span-5 p-6 bg-[#F7F8FA] border-b lg:border-b-0 lg:border-r border-[#0A1628]/10 space-y-4"
          >
            <h3 className="font-display text-base font-medium text-[#0A1628]">
              Add Sample Product
            </h3>

            <div>
              <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                Division
              </label>
              <select
                value={divisionId}
                onChange={(e) => setDivisionId(e.target.value as DivisionId)}
                className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
              >
                {DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.number}. {d.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Custom Rugby Jersey"
                  className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                  SKU Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="BS-01R"
                  className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm font-mono-tabular text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                  Subcategory
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                >
                  {selectedDivision.subcategories.map((sub) => (
                    <option key={sub.code} value={sub.title}>
                      {sub.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                  Weight / Spec
                </label>
                <input
                  type="text"
                  value={specWeight}
                  onChange={(e) => setSpecWeight(e.target.value)}
                  className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm font-mono-tabular text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                Materials (comma separated)
              </label>
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                Sizes (comma separated)
              </label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0A1628]/70 mb-1">
                Concise Description
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief technical overview..."
                className="w-full bg-white border border-[#0A1628]/20 px-3 py-2 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
              />
            </div>

            {formError && (
              <p className="text-xs text-red-700 font-medium" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A1628] text-white text-sm font-medium rounded-sm hover:bg-[#132642] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
            >
              <Plus className="w-4 h-4 text-[#C6A253]" />
              <span>Add to Sample Catalog</span>
            </button>
          </form>

          {/* Existing Product Listings */}
          <div className="lg:col-span-7 p-6 max-h-[540px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-medium text-[#0A1628]">
                Active Specimens ({products.length})
              </h3>
              <span className="text-xs text-[#0A1628]/55">Saved locally in browser</span>
            </div>

            <div className="divide-y divide-[#0A1628]/10 border-t border-b border-[#0A1628]/10">
              {products.map((item) => {
                const div = DIVISIONS.find((d) => d.id === item.divisionId);
                return (
                  <div
                    key={item.id}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#0A1628]/55">
                        <span className="font-mono-tabular text-[#8C6D2E] font-medium">
                          {item.code}
                        </span>
                        <span>·</span>
                        <span>
                          {div?.number} {div?.shortTitle}
                        </span>
                        <span>·</span>
                        <span className="font-mono-tabular">{item.specWeight}</span>
                      </div>
                      <p className="font-display text-sm font-medium text-[#0A1628] truncate mt-0.5">
                        {item.name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteProduct(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-2 text-[#0A1628]/45 hover:text-red-700 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
