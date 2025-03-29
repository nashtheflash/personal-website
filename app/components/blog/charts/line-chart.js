'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];

export function LineGraph({ title, data }) {
    const lines = getLines(data);

    return (
        <div className='w-full h-fit overflow-x-auto overflow-y-hidden'>
        <div className='w-[1000px] h-[750px]'>
            <ResponsiveContainer width="100%" height="95%">
                    <text x={500 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan fontSize="14">{title}</tspan>
                    </text>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        lines && lines.map((line, i) => (
                            <Line key={i} type="monotone" dataKey={line} stroke="#8884d8" activeDot={{ r: 8 }} />
                        ))
                    }
                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
}


function getLines(data) {
    const dataPoint = data[0];
    delete dataPoint.name;
    const keys = Object.keys(dataPoint);
    return keys;
    
}






