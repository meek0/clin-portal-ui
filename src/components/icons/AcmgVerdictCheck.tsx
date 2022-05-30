/* eslint-disable */
import cx from 'classnames';

import { IconProps } from '.';

const AcmgVerdictCheck = ({ className = '', width = '16', height = '16' }: IconProps) => (
  <svg
    className={cx('anticon', className)}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_1044_26488" transform="scale(0.0208333)" />
      </pattern>
      <image
        id="image0_1044_26488"
        width="48"
        height="48"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAK4GlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUk8kWgOf/00NCCyAgJfTeWwApoYcivYpKSAIJJcSEgCJ2FldwBRGRpii4KqLg6grIKiIWLIiiAvYFWRTUdbFgQ2V/4BF295333nn3nPnnO/e/c+fee2bOuQMA2Y8pEKTBsgCk8zOFYb4e1JjYOCruKUADaUAAikCLyRIJ6CEhgQCRufnv8r4fQNPzbbNpX//+/7+KPJsjYgEAxSOcyBax0hHuQMZzlkCYCQDqCKLXyc4UTPNNhBWESIAI/zbNybP8cZoTZxhNmrGJCPNEmAoAnsRkCpMBIJkiemoWKxnxQ5rOwZLP5vERzkXYlcVlshE+jbBpenrGNI8ibIjYCwAgI9UBtMS/+Ez+m/9EiX8mM1nCs3nNCN6LJxKkMVf9n6X535KeJp7bQx8ZJK7QL2y6pkj97qZmBEiYn7g4eI557Nm6TzNX7Bc5xyyRZ9wcs5leAZK1aYsD5ziJ58OQ+MlkRMwxR+QdPsfCjDDJXklCT/ocM4Xz+4pTIyV6Loch8Z/DjYie4yxe1OI5FqWGB8zbeEr0QnGYJH4O39djfl8fSe7por/ky2NI1mZyI/wkuTPn4+fw6fM+RTGS2NgcL+95m0iJvSDTQ7KXIC1EYs9J85XoRVnhkrWZyOGcXxsiqWEK0z9kjkEg8AVU4Ae8QBgy2wIk+0zOyszpRDwzBKuEvGRuJpWO3DYOlcFnmZtSrS2trQGYvruzx+Ft6MydhJS653UZe5FjPIHcl+J5XeIuAFo2A6B8b16nWwOATB4AzedZYmHWrA49/cEAIpABCkAFaAAdYAjMgDWwB87AHXgDfxAMIkAsWAZYgAvSgRBkg1ywAeSDQlAMdoJKUAPqwCFwFBwHLeA0OAcugWvgJugDD8AgGAEvwDh4DyYhCMJBZIgCqUCakB5kAllDNMgV8oYCoTAoFkqAkiE+JIZyoU1QIVQCVUL7oHroJ+gUdA66AvVC96AhaAx6A32GUTAJVoDVYX3YAqbBdDgAjoCXwsnwCjgHzoO3weVwLXwEbobPwdfgPngQfgFPoABKCqWE0kKZoWgoT1QwKg6VhBKi1qIKUGWoWlQjqg3VhbqNGkS9RH1CY9EUNBVthnZG+6Ej0Sz0CvRa9FZ0JfoQuhl9AX0bPYQeR3/DkDFqGBOME4aBicEkY7Ix+ZgyzAHMScxFTB9mBPMei8UqYQ2wDlg/bCw2BbsauxW7G9uE7cD2YoexEzgcTgVngnPBBeOYuExcPq4CdwR3FncLN4L7iJfCa+Kt8T74ODwfvxFfhj+Mb8ffwj/DTxJkCXoEJ0IwgU1YRSgi7Ce0EW4QRgiTRDmiAdGFGEFMIW4glhMbiReJD4lvpaSktKUcpUKleFLrpcqljkldlhqS+kSSJxmTPEnxJDFpG+kgqYN0j/SWTCbrk93JceRM8jZyPfk8+TH5ozRF2lyaIc2WXiddJd0sfUv6lQxBRk+GLrNMJkemTOaEzA2Zl7IEWX1ZT1mm7FrZKtlTsgOyE3IUOSu5YLl0ua1yh+WuyI3K4+T15b3l2fJ58nXy5+WHKSiKDsWTwqJsouynXKSMKGAVDBQYCikKhQpHFXoUxhXlFW0VoxRXKlYpnlEcVEIp6SsxlNKUipSOK/UrfV6gvoC+gLNgy4LGBbcWfFBeqOyuzFEuUG5S7lP+rEJV8VZJVdmu0qLySBWtaqwaqpqtukf1ourLhQoLnReyFhYsPL7wvhqsZqwWprZarU6tW21CXUPdV12gXqF+Xv2lhpKGu0aKRqlGu8aYJkXTVZOnWap5VvM5VZFKp6ZRy6kXqONaalp+WmKtfVo9WpPaBtqR2hu1m7Qf6RB1aDpJOqU6nTrjupq6Qbq5ug269/UIejQ9rt4uvS69D/oG+tH6m/Vb9EcNlA0YBjkGDQYPDcmGboYrDGsN7xhhjWhGqUa7jW4aw8Z2xlzjKuMbJrCJvQnPZLdJrynG1NGUb1prOmBGMqObZZk1mA2ZK5kHmm80bzF/ZaFrEWex3aLL4pulnWWa5X7LB1byVv5WG63arN5YG1uzrKus79iQbXxs1tm02ry2NbHl2O6xvWtHsQuy22zXaffV3sFeaN9oP+ag65DgUO0wQFOghdC20i47Yhw9HNc5nnb85GTvlOl03OkPZzPnVOfDzqOLDBZxFu1fNOyi7cJ02ecy6Ep1TXDd6zropuXGdKt1e+Ku4852P+D+jG5ET6Efob/ysPQQepz0+ODp5LnGs8ML5eXrVeDV4y3vHeld6f3YR9sn2afBZ9zXzne1b4cfxi/Ab7vfAEOdwWLUM8b9HfzX+F8IIAWEB1QGPAk0DhQGtgXBQf5BO4IeLtZbzF/cEgyCGcE7gh+FGISsCPklFBsaEloV+jTMKiw3rCucEr48/HD4+wiPiKKIB5GGkeLIziiZqPio+qgP0V7RJdGDMRYxa2KuxarG8mJb43BxUXEH4iaWeC/ZuWQk3i4+P75/qcHSlUuvLFNdlrbszHKZ5czlJxIwCdEJhxO+MIOZtcyJREZideI4y5O1i/WC7c4uZY9xXDglnGdJLkklSaPJLsk7kse4btwy7kueJ6+S9zrFL6Um5UNqcOrB1Km06LSmdHx6Qvopvjw/lX8hQyNjZUavwESQLxhc4bRi54pxYYDwgAgSLRW1ZiogTVK32FD8nXgoyzWrKutjdlT2iZVyK/kru1cZr9qy6lmOT86Pq9GrWas7c7VyN+QOraGv2bcWWpu4tnOdzrq8dSPrfdcf2kDckLrh+kbLjSUb322K3tSWp563Pm/4O9/vGvKl84X5A5udN9d8j/6e933PFpstFVu+FbALrhZaFpYVftnK2nr1B6sfyn+Y2pa0rafIvmhPMbaYX9y/3W37oRK5kpyS4R1BO5pLqaUFpe92Lt95pcy2rGYXcZd412B5YHlrhW5FccWXSm5lX5VHVVO1WvWW6g+72btv7XHf01ijXlNY83kvb+/dfb77mmv1a8vqsHVZdU/3R+3v+pH2Y/0B1QOFB74e5B8cPBR26EK9Q339YbXDRQ1wg7hh7Ej8kZtHvY62Npo17mtSaio8Bo6Jjz3/KeGn/uMBxztP0E40/qz3c/VJysmCZqh5VfN4C7dlsDW2tfeU/6nONue2k7+Y/3LwtNbpqjOKZ4raie157VNnc85OdAg6Xp5LPjfcubzzwfmY83cuhF7ouRhw8fIln0vnu+hdZy+7XD59xenKqau0qy3X7K81d9t1n7xud/1kj31P8w2HG603HW+29S7qbb/lduvcba/bl+4w7lzrW9zX2x/Zf3cgfmDwLvvu6L20e6/vZ92ffLD+IeZhwSPZR2WP1R7X/mr0a9Og/eCZIa+h7ifhTx4Ms4Zf/Cb67ctI3lPy07Jnms/qR61HT4/5jN18vuT5yAvBi8mX+b/L/V79yvDVz3+4/9E9HjM+8lr4eurN1rcqbw++s33XOREy8fh9+vvJDwUfVT4e+kT71PU5+vOzyewvuC/lX42+tn0L+PZwKn1qSsAUMmdaARQy4KQkAN4cRHrjWAAoSF9OXDLbW88INPsemCHwn3i2/54RewDqBgCIWA1A4HUAKiqRdhbxL4O8CULIiN4RwDY2kvEvESXZWM/6IiF9H+bx1NRbpAfG7QDga/HU1GTt1NTXOiTYhwB08Gd7+mnRQN4X2TgAt5PvppHXg3/IbL//lxz/OYPpCGzBP+c/AeEEGbP6HtVMAAAAOGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAACoAIABAAAAAEAAAAwoAMABAAAAAEAAAAwAAAAAPj/TjYAAAiuSURBVGgF7VhtbBxHGX5ndte+OHHz4RDs5gsHtTQW2KYqzZU0JaE1UoGmUNHyowQVUYESlF4JEkiAUPgBlQLIURvoWUrERwUtqbhUVapCZSgShYgAAbdgPqrGAdJKNA1NnPN97c4Mzztzu3fnOu7ZjuQieaS52ZmdmX2e933ed/aWaKEsWGDBAgsWmE8LiPl8+FTP3vuX21sq3n+v8ii8JiDd7Qvje6THjVDPahEe/+IVfzxTv+4NRWDPX2+80jPi3kCYWxdJ6mz3PbnEk5SShoxRxaIqnzgflb8zEbTl9nb/ssRE3jAEdo/enPbJPCBJXxMAcJuUxODbUblt8wQFQtO5sJj/T3nimyYl9u1Ze6zo17tjvq53jt6SJjJDikwvYwi1poLRpMmQNoaUrYIW+5I6WhYvwZQvvFgcfxW3H/DmC3T83LtHb0uTkFn0+5wchJWFwQCDZxJ8zSVu23w/KKroqute7vj1vBK4a/SjsLwYArI+EjF8hlpHAjcVgwcZLvzrYS66ywpRWJg3AneO3pkGCGt5BmbhT0cCk2u+4AVG5FXY9poYMM9Qe9RC7zCt9C6s6WIDCEVjFNKJoESjYhuV+IFzKbeN3pWOtM5KIfoa9mHzJmlFo1O1L8YrLCaFuMA1cJGPeYbkWxIC5jB55W7aVklRRqboeuHRMsmTeJ8Ia0r0SsWnJyvHabDlWvpTw4Nn0Lll9O40aY2ApV6rB2f62g4JCb7B4qmRQFTQBAKcPYFUS6GRgV3O4MMN9CmToq/IRdSZRBFvyxtyARGQ4Po3WODe1Cb6mbvR/O/NIzvTvqeyOJj6kC6JK65JIj16AGuvpxwz9r6dj7lIt/AAAOnoBUug/Fv6kGilQyJFKxI4VVfZfkyC2wpIlMWYUfIzqevVk8n817m4aWR32pdqCCB7HWBHYLYkHFnzsCj8hlZ7AT0qWug6mKRmcQZbD5wBakR/BM4VTAwlSIjdqYHyE3xrurJ1ZE/ak5ED32DhZklUPWXXKuc5oc8K0p/wfZ+2A+fVJqpCmAw6JqIBOkJVTMJed6P/7dLjLSK1/cLRixHYDPBGUhYQ7CGVzON9rf+TEWewacZiaFiBMBCP6PaJYR96HkC3FeSmLrA6KQbuCFgPOALsjfVMYuKhZXLxjnOPT95g08jn01g+pIzuNaxZKLm+cDaZKQlej3VP+b64bxCvEkBFG3jwNcUAOAMN8dCKR8ZW9LktV2sJSix660zJOzCe7bi1fo+rR74E8AEsL3ut0+EGBbQuXOMQRmvHa/3aXA5rN14bs/1hIcTuwbcdfZGfJ7Enk6gVtgpbO3TgHXCQqANtCYA7wJPGWagn/LX6QnDg1fu6Pswb9Y7sBXhvSJPoi1VeA9FIojbeFIlh5KBd9/ccfT4GjNdtOpNoq0EuidarmkffkpK21QhkUwEYtKqMh5flGlOm+/d//wMbh4T3kcAgz0/WMz/VyqYmp+TZdjyGVW0bx4Yhw10He36SgOdZPuYcQ0BsRXACCayO6oLUSYhBW91zC7A6bh1oUiChSuwNQc91dK356fqNXzUkPLa8AzsJFHctsBqJZEYjYDdsx8ywFmLXj3p+3ACeJ/CJ/BhA7gDwddXsYrWfgGbAFrSzNlsc1rZWZ8urEghATs+t7KLBzVtobMUK3zfK6p0VOkcSDP+IkPJzD2/83ikGPLnI4Fo6gcD8LrSupghQq3MFnUcFn6IJn8I8/uyhVi54VB5HPe/RiaWr6Rs3bKPnV64CYNY4SKK6oMX1pEB19+JxFxPxWF1MwAwiJyJ9zyMXAc9kfLwA6vGnWw+0FHUPJHK7tba1urO4YalUdc5SYatHaEO+Lgh6dtXltP+9W+nkqg7oUVngjdpnqczYEwaxmVNKZh7tP2SzDYOdqiRhVnhs0VpTDg5Q0dtuZWKlglRW1XgMPELqDKF3hTry5tW0/4PbaKzTgefjHaHu3mmQ950fXIvE6/oY53mN99C34zxHGdzPtagoc7Q/Oy14JpQQ4M5LP+xa//do1aHu8XM3Ls2XKELOZ8ARrM4Wj6D1CMDLGPvd2nWUff8NdOpyBl8DNEcSAG9yeH3P/KJ/8HXBM+aGo/Fbufz5sU9+/NgL3vI+vLCtbz9XITmOI+ECCKDmiwH9M1hOud5eOjjwbjq9cjlJHIvWCtU/I7wp93nUjfNIrVRH7aQG67klOV+ZpsHzrpP2cA+67Kl9V6wIC4fW5M9v6TnzCqVKyCo4lU9ftpT+vKaLXnrTcjL4g82vtfh4gL94XHHNtSqPGXrCQEI5qcqZY01aPjbJlAT45srhr1+ZF97BkudvIenhLyvUDbT4F2VzL7dsdA//eviPD758zJYEwJtcq9IA/7WmZBOD57ZBQvU3Cj/4+dnOj73nmTLJt+PVrxvGhXXhsro3MEuKFzGTamuv4j7fQp1GTpznc0arzO9nAd4+kn+mLb8a3CAilQWQAQYqcGCzbhi85LbqAecFYeUk8WHKSmp6OSFgVS4wMjPS/+UZWz7GXDVd3L1IyySUflBo/T4HHiRAxIIHckcmlhK3IBBLKkmZLj5sChV8tOmcMCrzjzmAZ7TNEeCZsSeMGaiRAHiOi5gEduNr5426uGgkYfN8QB7A75m15RkSl+YJ8GxLIszCwJATe6DmCZZWDD5unReYVPVwsy8VOoedMqcvAXiGNDMCvGIyibqYcJLi+OCM5LxhUywIgIS1vE/qkoGfHYGYRBgNIbHeZNHiIxKDZy+4lgM8lhIHNsBLc4Skf8/Z/p1zlg1DiAs0MIuy5bMnTeB/Gun1CXyk4k9m+ACGJq5ItRqf0LgqbRTqEVMxmUsNnpHPXEL1fJ/e1ymN2IVtduCdYp0VTeIFqeCFU8KTD/mRfDC/eefL9Usv1fXcCDCKw4c96vr3Wz1lNuF72TuBfwlklMfh9Qf8szle/lfXSbrjDv5G+H9SDH/OWCgLFliwwIIFmrTA/wDvuoTbuMX9qgAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);
export default AcmgVerdictCheck;
