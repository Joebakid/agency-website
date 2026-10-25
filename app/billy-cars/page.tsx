import type { Metadata } from 'next';
import Container from '../components/Container';
import BackButton from '../components/BackButton';
import BillyCarsPackages from '../components/BillyCarsPackages';

export const metadata: Metadata = {
  title: 'Billy Cars Proposal',
  description: 'Website packages for Billy Cars, from a WhatsApp-ready showroom to a full car-sales platform.',
  robots: { index: false, follow: false }, // private pitch: keep it out of Google
};

export default function BillyCarsPage() {
  return (
    <div className="py-12 md:py-24">
      <Container>
        <BackButton text="Back" fallbackHref="/" />
        <BillyCarsPackages />
      </Container>
    </div>
  );
}