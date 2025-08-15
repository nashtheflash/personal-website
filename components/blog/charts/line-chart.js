'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function LineGraph({ title, data }) {
    const lines = getLines(data);

    return (
        <div className='w-full h-fit p-4 flex flex-col items-center justify-center'>
            <div className='w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px]'>
                <h3 className='text-center text-lg font-semibold mb-4 text-gray-800'>
                    {title}
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12, fill: '#374151' }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis 
                            tick={{ fontSize: 12, fill: '#374151' }}
                            width={60}
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}
                        />
                        <Legend 
                            wrapperStyle={{
                                fontSize: '12px',
                                paddingTop: '10px'
                            }}
                        />
                        {
                            lines && lines.map((line, i) => (
                                <Line 
                                    key={i} 
                                    type="monotone" 
                                    dataKey={line} 
                                    stroke={`hsl(${i * 137.5 % 360}, 70%, 50%)`}
                                    strokeWidth={2}
                                    activeDot={{ r: 6 }} 
                                    dot={{ r: 3 }}
                                />
                            ))
                        }
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function getLines(data) {
    if (!data || data.length === 0) return [];
    const dataPoint = data[0];
    const { name, ...rest } = dataPoint;
    const keys = Object.keys(rest);
    return keys;
}
