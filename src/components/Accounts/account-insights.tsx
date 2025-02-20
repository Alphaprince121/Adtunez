import LastDays from '../../components/Accounts/LastDays';
import TrafficView from '../../components/Accounts/traffic-view';

const Page = () => {
    return (
        <div className="min-w-[1300px] w-full min-h-[66px]">
            <div className="flex justify-between items-center bg-white rounded-md p-3">
                <div>
                    <h1 className="text-[16px] font-medium leading-[20px] text-[#333333]">Account Insights</h1>
                    <p className="text-[#898D9F] text-[12px] leading-[20px]">View, monitor, and optimize account performance.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 border px-[12px] py-2 rounded-md cursor-pointer font-medium text-sm">
                        <img src="/icons/campaigns.svg" alt="campaigns-icons" className="w-5 h-5" />
                        <h1 className='font-medium text-[12px] leading-[20px]'>All Campaigns</h1>
                    </div>
                    <div className='flex gap-6'>
                    <LastDays />
                    <TrafficView />

                    </div>


                    <div>
                        <img src="/icons/setting.png" alt="setting-icon" className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
