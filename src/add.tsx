// # 不依赖网络：使用Mock模拟网络请求的成功或失败，如用msw
// # 何时（不）该用快照：简短的可用，较大的数据，应尽量使用特征断言
// # 异步操作逻辑，用act将异步操作包裹起来
// # 在ts的环境下，如何测试参数不合法
import React from 'react';

type Order = { id: string, title: string }
export const Add: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null)
    const [data, setData] = React.useState<Order[]>([]);
    const [keywork, setKeywork] = React.useState("123")

    const queryData = (orderId: string) => {
        return fetch("/api/queryOrder", {
            method: "POST",
            body: JSON.stringify({ orderId })
        }).then(resp => resp.json())
    } 

    return <div>
        <input value={keywork} onChange={e => setKeywork(e.currentTarget.value)}></input>
        <button onClick={async () => {
            setLoading(true)
            const resp = await queryData(keywork);
            setLoading(false)
            setData(resp)
        }}> { loading ? "Loading" : "search" }</button>
        <div>count: {data.length}</div>
    </div >;
}