import './globals.css';

export const metadata = {
  title: { default: 'Acme Dashboard', template: '%s | Acme Dashboard' },
  description: 'A financial dashboard practice project based on Next.js Learn.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
