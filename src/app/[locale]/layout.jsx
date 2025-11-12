import Header from '@/conponents/header';
import {NextIntlClientProvider} from 'next-intl';
 import './globals.css'
import Footer from '@/conponents/footer';
import WhatsAppFloat from '@/conponents/whatsAppFloat';
import ScrollToTopButton from '@/conponents/scroolToBottom';

 
export default async function RootLayout({children}) {
  return (
    <html>
      <body>

        <NextIntlClientProvider>
          <Header/>
          
          {children}
           <WhatsAppFloat/>
          <Footer/>
          <ScrollToTopButton/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}