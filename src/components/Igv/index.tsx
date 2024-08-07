import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { IIGVBrowser, IIGVBrowserOptions } from './type';

import styles from './index.module.css';

declare global {
  interface Window {
    igv: any;
  }
}

type OwnProps = {
  id?: string;
  className?: string;
  options: IIGVBrowserOptions;
  loading?: boolean;
};

const IGV = ({ id = 'igvContainer', className = '', options }: OwnProps) => {
  const igvContainerRef = useRef<HTMLDivElement>(null);
  const [browser, setBrowser] = useState<IIGVBrowser | null>(null);
  const [previousOptions, setPreviousOptions] = useState<IIGVBrowserOptions | null>(null);

  useEffect(() => {
    if (
      igvContainerRef.current &&
      window.igv.browser !== true && // window.igv.browser = true during async creation, object otherwise
      !browser &&
      options.tracks?.length! > 0
    ) {
      window.igv.browser = true;
      window.igv.createBrowser(igvContainerRef.current, options).then((browser: any) => {
        window.igv.browser = browser;
        setBrowser(browser);
        setPreviousOptions(options);
      });
    }
    // eslint-disable-next-line
  }, [options.tracks]);

  useEffect(() => {
    if (browser && previousOptions?.locus !== options.locus) {
      browser.search(options.locus);
      setPreviousOptions(options);
    }
    // eslint-disable-next-line
  }, [options, previousOptions]);

  return <div id={id} ref={igvContainerRef} className={cx(className, styles.igvContainer)}></div>;
};

export default IGV;
