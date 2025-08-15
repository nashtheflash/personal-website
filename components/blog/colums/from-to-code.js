export function FromToCode({ from, to }) {
    return(
        <div className='flex justify-center items-center gap-4 text-xs'>
            <pre>
                <code>
                    {from}
                </code>
            </pre>
            <h1>{'->'}</h1>
            <pre>
                <code>
                    {to}
                </code>
            </pre>
        </div>
    )
}
