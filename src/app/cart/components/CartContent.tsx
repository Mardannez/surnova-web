'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { PRODUCTS, formatPrice } from '@/lib/mockData';

interface CartItem {
  product: (typeof PRODUCTS)[0];
  quantity: number;
}

const INITIAL_CART: CartItem[] = [
  { product: PRODUCTS[0], quantity: 1 },
  { product: PRODUCTS[7], quantity: 2 },
];

export default function CartContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setCartItems(items => items.map(item => item.product.id === id ? { ...item, quantity: qty } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.product.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 350;
  const discount = couponApplied ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + shipping - discount;

  const handleWhatsApp = () => {
    const lines = cartItems.map(item => `• ${item.product.name} (SKU: ${item.product.sku}) x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`).join('\n');
    const msg = encodeURIComponent(`Hola SURNOVA, quiero comprar:\n${lines}\n\nTotal estimado: ${formatPrice(total)}`);
    window.open(`https://wa.me/50499999999?text=${msg}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCartIcon" size={40} className="text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Tu carrito está vacío</h2>
          <p className="text-muted-foreground">Explora nuestro catálogo y agrega productos</p>
        </div>
        <Link href="/catalog" className="btn-primary px-8">
          Explorar catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium">Carrito</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-foreground mb-8">
        Carrito de compras
        <span className="ml-2 text-base font-medium text-muted-foreground">({cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map(item => (
            <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-xl p-4 shadow-sm">
              <Link href={`/product-detail?sku=${item.product.sku}`} className="shrink-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted">
                  <AppImage
                    src={item.product.images[0]}
                    alt={`${item.product.name} en carrito SURNOVA`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="flex flex-col flex-1 min-w-0 gap-1">
                <p className="text-xs font-bold text-muted-foreground uppercase">{item.product.brand}</p>
                <Link href={`/product-detail?sku=${item.product.sku}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {item.product.name}
                </Link>
                <p className="text-xs text-muted-foreground font-mono">SKU: {item.product.sku}</p>
                <div className="flex items-center justify-between mt-auto pt-2 gap-3">
                  {/* Qty */}
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Icon name="MinusIcon" size={14} />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-bold border-x border-border">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Icon name="PlusIcon" size={14} />
                    </button>
                  </div>
                  {/* Price */}
                  <div className="text-right">
                    <p className="text-base font-extrabold text-foreground">{formatPrice(item.product.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)} c/u</p>
                    )}
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
                    aria-label="Eliminar producto"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <Link href="/catalog" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors mt-2">
            <Icon name="ArrowLeftIcon" size={16} />
            Continuar comprando
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-foreground mb-6">Resumen del pedido</h2>

            {/* Coupon */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                className="input-field flex-1 text-sm"
                placeholder="Código de descuento"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              <button
                onClick={() => { if (coupon.trim()) setCouponApplied(true); }}
                disabled={couponApplied || !coupon.trim()}
                className="btn-dark text-sm px-4 disabled:opacity-50"
              >
                {couponApplied ? '✓' : 'Aplicar'}
              </button>
            </div>
            {couponApplied && (
              <p className="text-xs text-green-600 font-semibold -mt-4 mb-4">¡Cupón aplicado! 5% de descuento</p>
            )}

            {/* Line items */}
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>
                  {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Descuento</span>
                  <span className="font-semibold text-green-600">-{formatPrice(discount)}</span>
                </div>
              )}
              {shipping === 0 && (
                <p className="text-xs text-green-600 font-medium">🎉 Envío gratis en pedidos sobre L 20,000</p>
              )}
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Agrega {formatPrice(20000 - subtotal)} más para envío gratis
                </p>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-border mt-4 pt-4">
              <span className="text-base font-bold text-foreground">Total</span>
              <span className="text-2xl font-extrabold text-foreground">{formatPrice(total)}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/checkout" className="btn-primary w-full py-3.5 text-base justify-center">
                Finalizar compra
              </Link>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-green-300 bg-green-50 text-green-700 font-bold text-sm hover:bg-green-100 transition-all"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={18} />
                Comprar por WhatsApp
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="LockClosedIcon" size={12} />
                Compra segura
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="ShieldCheckIcon" size={12} />
                Garantía oficial
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}