import CoursePage from "@/components/coursePage";
import { rocketSVG } from "@/utils/images";

const MarketingDigital: React.FC = () => {
  return (
    <CoursePage
      imageSrc={rocketSVG}
      courseTitle="MARKETING DIGITAL"
      duration="3 meses"
      startDate="00/00/00"
      endDate="00/00/00"
      description="Nuestro curso de Marketing Digital enseña estrategias clave como SEO, SEM, Marketing en Redes Sociales, Email Marketing, y Análisis Digital para medir el éxito y optimizar campañas."
    />
  );
};

export default MarketingDigital;