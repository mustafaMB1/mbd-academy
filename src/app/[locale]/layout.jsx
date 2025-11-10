import Header from '@/conponents/header';
import {NextIntlClientProvider} from 'next-intl';
 import './globals.css'
import Footer from '@/conponents/footer';
import WhatsAppFloat from '@/conponents/whatsAppFloat';

 
export default async function RootLayout({children}) {
  return (
    <html>
      <body>

        <NextIntlClientProvider>
          <Header/>
          
          {children}
           <WhatsAppFloat/>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}