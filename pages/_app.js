import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreProvider } from '../context/StoreContext';

function MyApp({ Component, pageProps, router }) {
  return (
    <StoreProvider>
      <AnimatePresence>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
            pageExit: {
              backgroundColor: 'white',
              filter: `invert()`,
              opacity: 0,
            },
          }}
        >
          <ToastContainer />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </StoreProvider>
  );
}

export default MyApp;
