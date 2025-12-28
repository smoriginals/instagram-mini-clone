import { useContext, createContext, useRef, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { axiosBridge } from '../utility/loadingBridge';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {

    const loadingRef = useRef(null);

    const startLoading = () => {
        loadingRef.current?.continuousStart();
    }
    const stopLoading = () => {
        loadingRef.current?.complete();
    }
    useEffect(() => {
        axiosBridge(startLoading, stopLoading);
    },[])

    return (
        <LoadingContext.Provider value={{startLoading,stopLoading} }>
            <LoadingBar color="linear-gradient(90deg, #00c6ff, #0072ff, #8e2de2)" height={4} ref={loadingRef} shadow={true }/>
            {children}
        </LoadingContext.Provider>
    )

}
// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext);