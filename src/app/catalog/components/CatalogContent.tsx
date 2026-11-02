'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import { PRODUCTS, CATEGORIES, BRANDS } from '@/lib/mockData';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor calificados' },
  { value: 'discount', label: 'Mayor descuento' },
];

const PRICE_RANGES = [
  { label: 'Hasta L 5,000', min: 0, max: 5000 },
  { label: 'L 5,000 – L 15,000', min: 5000, max: 15000 },
  { label: 'L 15,000 – L 30,000', min: 15000, max: 30000 },
  { label: 'L 30,000 – L 50,000', min: 30000, max: 50000 },
  { label: 'Más de L 50,000', min: 50000, max: Infinity },
];

export default function CatalogContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const ITEMS_PER_PAGE = 12;

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    if (priceRange) result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    if (onlyAvailable) result = result.filter(p => p.stock > 0);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [selectedCategory, selectedBrands, priceRange, onlyAvailable, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  const FiltersPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Categoría</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => { setSelectedCategory('all'); setPage(1); }}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
              selectedCategory === 'all' ?'bg-primary text-white font-semibold' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Todas las categorías
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white font-semibold' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Marca</h3>
        <div className="flex flex-col gap-2">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="filter-checkbox w-4 h-4 rounded"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Precio</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => { setPriceRange(null); setPage(1); }}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
              !priceRange ? 'bg-primary text-white font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Cualquier precio
          </button>
          {PRICE_RANGES.map(range => (
            <button
              key={range.label}
              onClick={() => { setPriceRange({ min: range.min, max: range.max }); setPage(1); }}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
                priceRange?.min === range.min && priceRange?.max === range.max
                  ? 'bg-primary text-white font-semibold' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Disponibilidad</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="filter-checkbox w-4 h-4 rounded"
            checked={onlyAvailable}
            onChange={() => { setOnlyAvailable(!onlyAvailable); setPage(1); }}
          />
          <span className="text-sm text-muted-foreground">Solo disponibles</span>
        </label>
      </div>

      {/* Laptop-specific filters (shown when category = laptops) */}
      {selectedCategory === 'laptops' && (
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Laptops</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Procesador', options: ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7'] },
              { label: 'RAM', options: ['8 GB', '16 GB', '32 GB'] },
              { label: 'SSD', options: ['256 GB', '512 GB', '1 TB', '2 TB'] },
            ].map(filter => (
              <div key={filter.label}>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">{filter.label}</p>
                <div className="flex flex-wrap gap-1">
                  {filter.options.map(opt => (
                    <button
                      key={opt}
                      className="text-xs px-2 py-1 rounded border border-border bg-muted hover:border-primary hover:text-primary transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium">Catálogo</span>
      </nav>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground">Filtros</h2>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedBrands([]); setPriceRange(null); setOnlyAvailable(false); }}
                  className="text-xs text-primary hover:text-secondary font-semibold"
                >
                  Limpiar
                </button>
              </div>
              <FiltersPanel />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {selectedCategory === 'all' ? 'Todos los productos' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </h1>
              <p className="text-sm text-muted-foreground">{filteredProducts.length} productos encontrados</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 btn-secondary text-sm py-2 px-3"
              >
                <Icon name="FunnelIcon" size={16} />
                Filtros
              </button>
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1); }}
                className="input-field w-auto text-sm py-2"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products grid */}
          {paginatedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-lg font-bold text-foreground">Sin resultados</p>
              <p className="text-muted-foreground text-sm">Intenta ajustar los filtros</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Icon name="ChevronLeftIcon" size={16} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                    page === i + 1
                      ? 'bg-primary text-white' :'border border-border hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Icon name="ChevronRightIcon" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background shadow-2xl overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-foreground text-lg">Filtros</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <Icon name="XMarkIcon" size={22} className="text-muted-foreground" />
                </button>
              </div>
              <FiltersPanel />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="btn-primary w-full mt-6"
              >
                Ver {filteredProducts.length} productos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}