import ChartJs from "../../components/Programs/ChartJs";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";
import ProjectDev from "../../components/Programs/ProjectsDev";
import { FC } from "react";

const General: FC = () => {
  return (
    <>
      <ProgramsNavBar />
      <div className="container mx-auto p-4">
        <ChartJs />
        <ProjectDev />
      </div>
    </>
  );
};

export default General;
