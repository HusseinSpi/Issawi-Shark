import ChartJs from "../../components/Programs/ChartJs";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";
import ProjectDev from "../../components/Programs/ProjectsDev";
import { FC } from "react";

const General: FC = () => {
  return (
    <>
      <ProgramsNavBar />
      <ChartJs />
      <ProjectDev />
    </>
  );
};

export default General;
