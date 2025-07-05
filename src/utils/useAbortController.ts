import { useEffect, useState } from "react";

export default function useAbortController() {
    const [controller] = useState(new AbortController());
    useEffect(()=> ()=>controller.abort(),[controller]);
    return controller.signal;
}