'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

type Tab = 'login' | 'register';

export default function AuthContent() {
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '', password: '', confirm: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    setTimeout(() => setLoginSuccess(false), 3000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess(true);
    setTimeout(() => setRegisterSuccess(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-104px)] grid lg:grid-cols-2">
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between hero-dark-bg p-12 relative overflow-hidden">
        {/* Blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
          <div className="blob-accent w-full h-full" />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(to right, #E8FF47 1px, transparent 1px), linear-gradient(to bottom, #E8FF47 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <AppLogo size={36} />
            <span className="font-extrabold text-2xl text-white tracking-tight">SURNOVA</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Tecnología que transforma.</p>
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Tu próxima<br />
            <span className="text-accent">tecnología</span><br />
            te espera.
          </h2>
          <p className="text-white/50 leading-relaxed max-w-sm">
            Accede a tu cuenta para gestionar tus pedidos, guardar favoritos y recibir ofertas exclusivas.
          </p>

          {/* Feature bullets */}
          <div className="flex flex-col gap-3 mt-2">
            {[
              'Historial completo de pedidos',
              'Lista de favoritos sincronizada',
              'Seguimiento de envíos en tiempo real',
              'Ofertas exclusivas para miembros',
            ].map(feat => (
              <div key={feat} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Icon name="CheckIcon" size={12} className="text-accent" />
                </div>
                <span className="text-sm text-white/70">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-white/25">© 2026 SURNOVA · Honduras</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={28} />
            <span className="font-extrabold text-xl text-foreground">SURNOVA</span>
          </div>

          {/* Tabs */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                tab === 'login' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                tab === 'register' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Crear cuenta
            </button>
          </div>

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <>
              {loginSuccess ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={36} className="text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-foreground">¡Bienvenido!</p>
                  <p className="text-sm text-muted-foreground">Sesión iniciada correctamente</p>
                  <Link href="/" className="btn-primary mt-2 px-6">Ir al inicio</Link>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <div>
                    <h1 className="text-2xl font-extrabold text-foreground mb-1">Bienvenido de vuelta</h1>
                    <p className="text-sm text-muted-foreground">Ingresa a tu cuenta SURNOVA</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Icon name="EnvelopeIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        className="input-field pl-10"
                        placeholder="correo@ejemplo.com"
                        value={loginForm.email}
                        onChange={e => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Contraseña</label>
                      <button type="button" className="text-xs text-primary hover:text-secondary font-semibold transition-colors">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <div className="relative">
                      <Icon name="LockClosedIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input-field pl-10 pr-10"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-3 text-base">
                    Iniciar sesión
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('register')}
                      className="text-primary font-bold hover:text-secondary transition-colors"
                    >
                      Regístrate gratis
                    </button>
                  </p>
                </form>
              )}
            </>
          )}

          {/* REGISTER FORM */}
          {tab === 'register' && (
            <>
              {registerSuccess ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={36} className="text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-foreground">¡Cuenta creada!</p>
                  <p className="text-sm text-muted-foreground">Revisa tu correo para confirmar tu cuenta</p>
                  <Link href="/" className="btn-primary mt-2 px-6">Ir al inicio</Link>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-foreground mb-1">Crea tu cuenta</h2>
                    <p className="text-sm text-muted-foreground">Únete a SURNOVA y empieza a comprar</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Nombre *</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Carlos"
                        value={registerForm.nombre}
                        onChange={e => setRegisterForm(prev => ({ ...prev, nombre: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Apellido *</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Martínez"
                        value={registerForm.apellido}
                        onChange={e => setRegisterForm(prev => ({ ...prev, apellido: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Correo electrónico *</label>
                    <div className="relative">
                      <Icon name="EnvelopeIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        className="input-field pl-10"
                        placeholder="correo@ejemplo.com"
                        value={registerForm.email}
                        onChange={e => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Teléfono</label>
                    <div className="relative">
                      <Icon name="PhoneIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        className="input-field pl-10"
                        placeholder="+504 9999-9999"
                        value={registerForm.telefono}
                        onChange={e => setRegisterForm(prev => ({ ...prev, telefono: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Contraseña *</label>
                    <div className="relative">
                      <Icon name="LockClosedIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input-field pl-10 pr-10"
                        placeholder="Mínimo 8 caracteres"
                        value={registerForm.password}
                        onChange={e => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Confirmar contraseña *</label>
                    <div className="relative">
                      <Icon name="LockClosedIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        className="input-field pl-10 pr-10"
                        placeholder="Repite tu contraseña"
                        value={registerForm.confirm}
                        onChange={e => setRegisterForm(prev => ({ ...prev, confirm: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon name={showConfirm ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-3 text-base mt-1">
                    Crear cuenta gratis
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Al registrarte, aceptas nuestros{' '}
                    <a href="#" className="text-primary font-semibold hover:underline">Términos de uso</a>
                    {' '}y{' '}
                    <a href="#" className="text-primary font-semibold hover:underline">Política de privacidad</a>
                  </p>

                  <p className="text-center text-sm text-muted-foreground">
                    ¿Ya tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('login')}
                      className="text-primary font-bold hover:text-secondary transition-colors"
                    >
                      Inicia sesión
                    </button>
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}