import { Text  } from '@ui5/webcomponents-react';
import './styles.scss';

function Footer() {
  return (
    <footer>
        <Text className='disclaimer'>
            The information provided by the Open Movie Database is intended for entertainment and educational purposes only.
        </Text>
    </footer>
  );
}

export default Footer;
