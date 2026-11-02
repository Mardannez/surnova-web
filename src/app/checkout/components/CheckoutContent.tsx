'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { PRODUCTS, formatPrice, HONDURAN_DEPARTMENTS } from '@/lib/mockData';

type Step = 'shipping' | 'payment' | 'confirmation';

const PAYMENT_METHODS = [
  {
    id: 'transfer',
    label: 'Transferencia bancaria',
    icon: 'BuildingLibraryIcon',
    desc: 'Banco Atlántida, Bancolombia, BAC',
  },
  {
    id: 'deposit',
    label: 'Depósito bancario',
    icon: 'BanknotesIcon',
    desc: 'Depósito en ventanilla o cajero',
  },
  {
    id: 'cod',
    label: 'Pago contra entrega',
    icon: 'TruckIcon',
    desc: 'Disponible en zonas seleccionadas',
  },
  {
    id: 'link',
    label: 'Pago mediante enlace',
    icon: 'LinkIcon',
    desc: 'Recibirás un enlace de pago seguro',
  },
];

const ORDER_ITEMS = [
  { product: PRODUCTS[0], quantity: 1 },
  { product: PRODUCTS[7], quantity: 2 },
];

export default function CheckoutContent() {
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [orderNumber] = useState(() => {
    const num = Math.floor(Math.random() * 900000) + 100000;
    return `SN-${num}`;
  });

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    referencia: '',
  });

  const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 350;
  const total = subtotal + shipping;

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const STEPS = [
    { id: 'shipping', label: 'Envío', num: 1 },
    { id: 'payment', label: 'Pago', num: 2 },
    { id: 'confirmation', label: 'Confirmación', num: 3 },
  ];

  const currentStepIndex = STEPS.findIndex(s => s.id === step);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href="/cart" className="hover:text-foreground transition-colors">Carrito</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < currentStepIndex
                  ? 'bg-green-500 text-white'
                  : i === currentStepIndex
                  ? 'bg-primary text-white' :'bg-muted text-muted-foreground border border-border'
              }`}>
                {i < currentStepIndex ? <Icon name="CheckIcon" size={16} /> : s.num}
              </div>
              <span className={`text-xs font-semibold ${i === currentStepIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mb-4 transition-all ${i < currentStepIndex ? 'bg-green-500' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main form */}
        <div className="lg:col-span-2">

          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="TruckIcon" size={22} className="text-primary" />
                  Información de envío
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Nombre *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Carlos"
                      value={form.nombre}
                      onChange={e => updateForm('nombre', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Apellido *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Martínez"
                      value={form.apellido}
                      onChange={e => updateForm('apellido', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Teléfono *</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="+504 9999-9999"
                      value={form.telefono}
                      onChange={e => updateForm('telefono', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="correo@ejemplo.com"
                      value={form.email}
                      onChange={e => updateForm('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Departamento *</label>
                    <select
                      className="input-field"
                      value={form.departamento}
                      onChange={e => updateForm('departamento', e.target.value)}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {HONDURAN_DEPARTMENTS.map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Ciudad / Municipio *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Choluteca"
                      value={form.ciudad}
                      onChange={e => updateForm('ciudad', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Dirección completa *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Col. El Centro, Calle Principal, Casa #12"
                      value={form.direccion}
                      onChange={e => updateForm('direccion', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Referencia</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Frente al parque central, casa de color azul..."
                      value={form.referencia}
                      onChange={e => updateForm('referencia', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="btn-primary px-8 py-3 text-base gap-2">
                    Continuar al pago
                    <Icon name="ArrowRightIcon" size={18} />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Icon name="CreditCardIcon" size={22} className="text-primary" />
                  Método de pago
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Selecciona cómo deseas realizar tu pago</p>

                <div className="flex flex-col gap-3">
                  {PAYMENT_METHODS.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        paymentMethod === method.id ? 'bg-primary text-accent' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon name={method.icon as Parameters<typeof Icon>[0]['name']} size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        paymentMethod === method.id ? 'border-primary' : 'border-muted-foreground/30'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'transfer' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-bold text-blue-800 mb-2">Datos bancarios</p>
                    <div className="text-xs text-blue-700 space-y-1 font-mono">
                      <p>Banco Atlántida — Cuenta: 1234-5678-9012</p>
                      <p>Titular: SURNOVA S.A. de C.V.</p>
                      <p>RTN: 08019999999999</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="btn-secondary px-6 py-3 gap-2"
                  >
                    <Icon name="ArrowLeftIcon" size={16} />
                    Volver
                  </button>
                  <button type="submit" className="btn-primary px-8 py-3 text-base gap-2">
                    Confirmar pedido
                    <Icon name="CheckIcon" size={18} />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircleIcon" size={44} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">¡Pedido confirmado!</h2>
              <p className="text-muted-foreground mb-6">Gracias por tu compra. Te contactaremos pronto.</p>

              <div className="bg-muted/50 rounded-xl p-4 mb-6 inline-block">
                <p className="text-xs text-muted-foreground mb-1">Número de pedido</p>
                <p className="text-2xl font-extrabold text-foreground font-mono">{orderNumber}</p>
              </div>

              <div className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                <p>Recibirás un correo de confirmación en <span className="font-semibold text-foreground">{form.email || 'tu correo'}</span> con los detalles de tu pedido.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="btn-primary px-8 py-3">
                  Volver al inicio
                </Link>
                <Link href="/catalog" className="btn-secondary px-8 py-3">
                  Seguir comprando
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">¿Tienes dudas sobre tu pedido?</p>
                <a
                  href={`https://wa.me/50499999999?text=${encodeURIComponent(`Hola SURNOVA, consulta sobre mi pedido ${orderNumber}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 transition-colors"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm sticky top-28">
            <h3 className="text-base font-bold text-foreground mb-4">Resumen</h3>
            <div className="flex flex-col gap-3 mb-4">
              {ORDER_ITEMS.map(item => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                    <AppImage
                      src={item.product.images[0]}
                      alt={`${item.product.name} resumen checkout`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.product.sku}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-border pt-3 mt-1">
                <span>Total</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {form.departamento && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Enviar a</p>
                <p className="text-xs text-foreground font-semibold">{form.nombre} {form.apellido}</p>
                <p className="text-xs text-muted-foreground">{form.ciudad}, {form.departamento}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}