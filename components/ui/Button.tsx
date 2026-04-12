'use client'
import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'outline-dark' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center font-semibold transition-all duration-200',
        size === 'sm' && 'px-4 py-2 text-sm rounded-lg',
        size === 'md' && 'px-6 py-3 text-[15px] rounded-xl',
        size === 'lg' && 'px-8 py-4 text-lg rounded-xl',
        variant === 'primary' &&
          'text-white shadow-lg hover:brightness-110',
        variant === 'outline' &&
          'border border-white/20 text-white hover:border-white/40 hover:bg-white/5 rounded-xl',
        variant === 'outline-dark' &&
          'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
        variant === 'ghost' && 'hover:bg-slate-100',
        className,
      )}
      style={variant === 'primary' ? {
        background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
        boxShadow: '0 4px 14px rgba(9,56,62,0.3)',
      } : undefined}
      {...props}
    >
      {children}
    </button>
  )
}
