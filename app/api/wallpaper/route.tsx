import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    const fontData = await fetch(
        new URL('./Frijole-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const utcNow = new Date();
    const istString = utcNow.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const today = new Date(istString);

    // Strip the time away to ensure clean midnight-to-midnight math
    today.setHours(0, 0, 0, 0);

    // Base dates
    const birthYear = 2003;
    const birthMonth = 4; // 4 = May in JavaScript
    const birthDay = 20;

    let nextBday = new Date(today.getFullYear(), birthMonth, birthDay);

    if (today.getTime() > nextBday.getTime()) {
        nextBday.setFullYear(today.getFullYear() + 1);
    }

    const age = nextBday.getFullYear() - birthYear;
    const diffTime = nextBday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Notice how we use `tw=` instead of `className=`
    return new ImageResponse(
        (
            <div tw="flex flex-col items-center justify-center w-full h-full bg-black">
                <div
                    style={{ fontFamily: '"Frijole"' }}
                    tw="flex text-[90px] text-white">
                    {diffDays} Days
                </div>
                <div tw="flex text-[60px] font-bold text-white mt-5">
                    Until {age}
                </div>
            </div>
        ),
        {
            width: 1170,
            height: 2532,
            fonts: [
                {
                    name: 'Frijole',
                    data: fontData,
                    style: 'normal',
                },
            ],
        }
    );
}