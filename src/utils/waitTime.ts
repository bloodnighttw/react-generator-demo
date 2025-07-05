interface waitTimeProps {
    ms: number;
    signal?: AbortSignal;
}


export default function waitTime(props: waitTimeProps): Promise<void> {
    return new Promise((resolve) => {
        const id= setTimeout(resolve, props.ms);
        if (props.signal) {
            props.signal.addEventListener("abort", () => {
                clearTimeout(id);
                resolve();
            }, { once: true });
        }
    });
}