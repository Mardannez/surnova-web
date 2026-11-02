'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const BUSINESS_FEATURES = [
  { icon: 'BuildingOfficeIcon', title: 'Cotizaciones personalizadas', desc: 'Precios especiales para compras en volumen' },
  { icon: 'TruckIcon', title: 'Entrega empresarial', desc: 'Coordinamos entrega en su oficina o empresa' },
  { icon: 'ShieldCheckIcon', title: 'Garantía extendida', desc: 'Opciones de garantía y soporte técnico' },
  { icon: 'DocumentTextIcon', title: 'Facturación formal', desc: 'Factura con CAI para deducción fiscal' },
];

export default function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ empresa: '', nombre: '', email: '', telefono: '', descripcion: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-up');
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — backend connection point
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <section ref={sectionRef} className="py-14 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="reveal-up">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Empresas</p>
              <h2 className="text-section-title text-foreground">SURNOVA Business</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Equipamos empresas, instituciones y equipos de trabajo con tecnología confiable. Cotizaciones personalizadas para compras en volumen.
              </p>
            </div>
            <div className="reveal-up grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUSINESS_FEATURES.map((feat, i) => (
                <div
                  key={feat.title}
                  className="flex gap-3 p-4 rounded-xl bg-card border border-border"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 shrink-0 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name={feat.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{feat.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quote form */}
          <div className="reveal-up">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-1">Solicitar cotización</h3>
              <p className="text-sm text-muted-foreground mb-6">Cuéntanos qué necesitas y te contactamos en menos de 24 horas.</p>

              {formSent ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
                  </div>
                  <p className="font-bold text-foreground">¡Solicitud enviada!</p>
                  <p className="text-sm text-muted-foreground">Te contactaremos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Empresa</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Nombre empresa"
                        value={formData.empresa}
                        onChange={e => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Contacto</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Su nombre"
                        value={formData.nombre}
                        onChange={e => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email</label>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="empresa@email.com"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Teléfono</label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="+504 9999-9999"
                        value={formData.telefono}
                        onChange={e => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">¿Qué necesita?</label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Ej: 10 laptops para oficina, presupuesto L 200,000..."
                      value={formData.descripcion}
                      onChange={e => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3 text-base">
                    Solicitar cotización
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}