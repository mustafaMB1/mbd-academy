import Header from '../../components/header';
import {NextIntlClientProvider} from 'next-intl';
 import './globals.css'
import Footer from '../../components/footer';
import WhatsAppFloat from '../../components/whatsAppFloat';
import ScrollToTopButton from '../../components/scroolToBottom';

 
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