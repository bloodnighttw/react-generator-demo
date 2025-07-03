type PromiseResult<T,E> = { success: true; value: T } | { success: false; error: E };

export async function* asCompleted<T,E = unknown>(promises:Array<Promise<T>> | ReadonlyArray<Promise<T>>) {

    const total = promises.length;
    let complete = 0;
    const resultQueue: PromiseResult<T,E>[] = [];
    let resolveNext: ((value: PromiseResult<T,E> | PromiseLike<PromiseResult<T,E>>) => void) | null = null;

    const getNextResult = () => {
        if(resultQueue.length > 0) {
            const result = resultQueue.shift();
            return Promise.resolve(result);
        }

        return new Promise<PromiseResult<T,E>>((resolve)=> {
            resolveNext = resolve;
        })
    }

    const pushResult = (result: PromiseResult<T,E>) => {
        if(resolveNext) {
            resolveNext(result);
            resolveNext = null;
        } else {
            resultQueue.push(result);
        }
    }

    promises.forEach(async (promise) => {
        try {
            const result = await promise;
            pushResult({ success: true, value: result });
        } catch (error) {
            pushResult({ success: false, error: error as E });
        }
    });

    while(complete < total) {
        const result = await getNextResult();
        complete++;
        if (result?.success) {
            yield result.value;
        } else if (result) {
            throw result.error;
        }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
}
