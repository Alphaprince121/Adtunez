import PerfromenceMetrics from '../../components/Accounts/performence-metrics';
import Alert from '../../components/Accounts/alert';
import Metric from '../../components/Accounts/metric';
import AuditScore from '../../components/Accounts/audit-score';
import Demographics from '../../components/Accounts/demographics';
import Searches from '../../components/Accounts/searches';
import ProjectedSpend from '../../components/Accounts/projected-spend';
import AccountPerformence from '../../components/Accounts/account-performence';
import History from '../../components/Accounts/history';
import Competitors from '../../components/Accounts/competitors';
import Insights from '../../components/Accounts/insights';
import Network from '../../components/Accounts/network';
import Devices from '../../components/Accounts/devices';
import AccountInsights from '../../components/Accounts/account-insights'

const page = () => {
    return (
        <div className='pt-6 bg-[#F3F3FF] pb-6 w-full'>
            <div className='px-5'>
                <AccountInsights />
            </div>
            <div className='flex mt-4 gap-3 px-5'>
                <PerfromenceMetrics />
                <Alert />
            </div>
            <div className='flex mt-4  gap-3 px-5'>
                <Metric />
                <AuditScore />
            </div>
            <div className='flex mt-4  gap-3 px-5 '>
                <Demographics />
                <Searches />
            </div>
            <div className='flex mt-4  gap-3 px-5 '>
                <ProjectedSpend />
                <AccountPerformence />
                <History />
            </div>
            <div className='flex mt-4  gap-3 px-5 '>
                <Competitors />
                <Insights />
            </div>
            <div className='flex mt-4  gap-3 px-5 '>
                <Network />
                <Devices />
            </div>
        </div>
    )
}

export default page
