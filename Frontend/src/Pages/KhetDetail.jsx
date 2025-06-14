import KhetInfo from '../Components/KhetDetail/KhetInfo'
import Header from '../Components/Header'
import LogOptions from '../Components/KhetDetail/LogOptions'
import SoilLogViewer from '../Components/KhetDetail/SoilLogViewer'
import PestLogViewer from '../Components/KhetDetail/PestLogViewer'
import EconomicLogViewer from '../Components/KhetDetail/EconomicLogViewer'
import CustomLogViewer from '../Components/KhetDetail/CustomLogViewer'
import CropLogViewer from '../Components/KhetDetail/CropLogViewer'

function KhetDetail() {
  return (
    <div>
      <Header/>
      <KhetInfo/>
      <LogOptions/>
      <CropLogViewer/>
      <SoilLogViewer />
      <PestLogViewer/>
      <EconomicLogViewer/>
      <CustomLogViewer/>
    </div>
  )
}

export default KhetDetail
