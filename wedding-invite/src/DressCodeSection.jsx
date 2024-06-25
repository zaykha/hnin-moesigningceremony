import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Styled components for Dress Code section
const DressCodeWrapper = styled.div`
  margin-top: 20px;
`;

const DressCodeContent = styled.div`
  margin-bottom: 20px;
`;

const DressCodeColors = styled.div`
  width: 26rem;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ColorBox = styled.div`
  width: 100px;
  height: 50px;
  background-color: ${props => props.color};
  border-radius: 10px;
`;

const DressCodeSection = () => {
    const { t } = useTranslation();
  return (
    <DressCodeWrapper>
      <h3>{t("Dress Code")}</h3>
      <DressCodeContent>
        <p>
          {t("We would love for you to join us in celebrating in style!")} <br></br>
          {t("While we are going with the elegance of ivory Burmese traditional attire,")} 
          {t("please feel free to dress in whatever makes you comfortable.")} <br></br>
          {t("Whether it's traditional attire, formal wear, or your favorite outfit, your presence is what matters most.")}
        </p>
        <p>
          {t("Should you choose to embrace our theme, we look forward to sharing a collective sense of cultural beauty on this special day.")}
        </p>
      </DressCodeContent>
      <h4>{t("Color Scheme")}</h4>
      <DressCodeColors>
        <ColorBox color="#fff5eb" /> {/* Light Ivory */}
        <ColorBox color="#ffe8c1" /> {/* Light Gold */}
        <ColorBox color="#e6b39a" /> {/* Medium Gold */}
        <ColorBox color="#d2a679" /> {/* Dark Gold */}
      </DressCodeColors>
    </DressCodeWrapper>
  );
};

export default DressCodeSection;
