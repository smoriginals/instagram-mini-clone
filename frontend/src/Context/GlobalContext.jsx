import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //====================================Story Handler=========//
    const [storyDrawerOpen, setStoryDrawerOpen] = useState(false);
    const OpenStoryDrawer = () => setStoryDrawerOpen(true);
    const CloseStoryDrawer = () => setStoryDrawerOpen(false);
    //====================================Story Handler=========//

    //==========================DarkMode=======================//
        
    //==========================DarkMode=======================//
   

    console.log('Global Provider is Running');

    return (
        <GlobalContext.Provider
            value={{
                storyDrawerOpen,
                OpenStoryDrawer,
                CloseStoryDrawer,

            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export function useGlobal() {
    return useContext(GlobalContext);
}
