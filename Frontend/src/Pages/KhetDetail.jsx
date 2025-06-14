import KhetInfo from '../Components/KhetDetail/KhetInfo';
import Header from '../Components/Header';
import LogOptions from '../Components/KhetDetail/LogOptions';
import SoilLogViewer from '../Components/KhetDetail/SoilLogViewer';
import PestLogViewer from '../Components/KhetDetail/PestLogViewer';
import EconomicLogViewer from '../Components/KhetDetail/EconomicLogViewer';
import CustomLogViewer from '../Components/KhetDetail/CustomLogViewer';
import CropLogViewer from '../Components/KhetDetail/CropLogViewer';
import IrrigationLogViewer from '../Components/KhetDetail/IrrigationLogViewer';
import AnalyzeLogs from '../Components/KhetDetail/AnalyzeLogs';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';

function KhetDetail() {
  const { khetId } = useParams(); // ✅ Correctly getting from route

  return (
    <div className='bg-green-50'>
      <Header />
      <KhetInfo />
      <LogOptions />
      <CropLogViewer />
      <IrrigationLogViewer />
      <SoilLogViewer />
      <PestLogViewer />
      <EconomicLogViewer />
      <CustomLogViewer />
      <AnalyzeLogs khetId={khetId} /> {/* ✅ Pass correct value here */}
      <Footer/>
    </div>
  );
}

export default KhetDetail;
