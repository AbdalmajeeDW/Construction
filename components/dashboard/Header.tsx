import { motion } from "framer-motion";
import LanguageSwitcher from "../LanguageSwitcher";
import I18nProvider from "../I18nProvider";

interface headerData {
  title: string;
  click?: () => any;
  titleButton?: string;
  buttonIcon?: React.ReactNode;
}

export default function Header({
  title,
  
  buttonIcon,
  titleButton,
  click,
}: headerData) {
  return (
    <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-xl">
      <div className="px-3 sm:px-6 md:px-8 py-4 sm:py-6">

        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4">

      
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent leading-tight"
            >
              {title}
            </motion.h1>

           
          </div>

          <div className="flex items-center   sm:w-auto gap-3 sm:gap-4">

            <div className=" sm:w-auto flex justify-start sm:justify-end">
              <I18nProvider>
                <LanguageSwitcher />
              </I18nProvider>
            </div>

         { titleButton&&  <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={click}
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-2
                px-4 sm:px-5 py-2.5
                text-xs sm:text-sm font-medium
                text-red-400 hover:text-red-300
                rounded-xl
                bg-red-500/10 backdrop-blur-sm
                border border-red-500/20
                hover:bg-red-500/20
                transition
              "
            >
              {buttonIcon}
              {titleButton}
            </motion.button>}

          </div>
        </div>
      </div>
    </div>
  );
}