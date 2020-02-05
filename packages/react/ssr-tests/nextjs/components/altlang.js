import PropTypes from 'prop-types';
import React from 'react';

/**
 * Altlang elements to include into the head tag
 *
 * @param {string} host hostname
 * @returns {*} altlang markup
 */
const AltLangs = ({ host }) => (
  <>
    <link rel="alternate" hrefLang="en-us" href={`//${host}?cc=us&lc=en`} />
    <link rel="alternate" hrefLang="x-default" href={`//${host}`} />
    <link rel="alternate" hrefLang="en-af" href={`//${host}?cc=af&lc=en`} />
    <link rel="alternate" hrefLang="fr-dz" href={`//${host}?cc=dz&lc=fr`} />
    <link rel="alternate" hrefLang="pt-ao" href={`//${host}?cc=ao&lc=pt`} />
    <link rel="alternate" hrefLang="en-ai" href={`//${host}?cc=ai&lc=en`} />
    <link rel="alternate" hrefLang="en-ag" href={`//${host}?cc=ag&lc=en`} />
    <link rel="alternate" hrefLang="es-ar" href={`//${host}?cc=ar&lc=es`} />
    <link rel="alternate" hrefLang="en-aw" href={`//${host}?cc=aw&lc=en`} />
    <link rel="alternate" hrefLang="en-au" href={`//${host}?cc=au&lc=en`} />
    <link rel="alternate" hrefLang="de-at" href={`//${host}?cc=at&lc=de`} />
    <link rel="alternate" hrefLang="en-bs" href={`//${host}?cc=bs&lc=en`} />
    <link rel="alternate" hrefLang="en-bh" href={`//${host}?cc=bh&lc=en`} />
    <link rel="alternate" hrefLang="en-bd" href={`//${host}?cc=bd&lc=en`} />
    <link rel="alternate" hrefLang="en-bb" href={`//${host}?cc=bb&lc=en`} />
    <link rel="alternate" hrefLang="en-be" href={`//${host}?cc=be&lc=en`} />
    <link rel="alternate" hrefLang="en-bm" href={`//${host}?cc=bm&lc=en`} />
    <link rel="alternate" hrefLang="es-bo" href={`//${host}?cc=bo&lc=es`} />
    <link rel="alternate" hrefLang="en-bw" href={`//${host}?cc=bw&lc=en`} />
    <link rel="alternate" hrefLang="pt-br" href={`//${host}?cc=br&lc=pt`} />
    <link rel="alternate" hrefLang="en-vg" href={`//${host}?cc=vg&lc=en`} />
    <link rel="alternate" hrefLang="en-bn" href={`//${host}?cc=bn&lc=en`} />
    <link rel="alternate" hrefLang="en-bg" href={`//${host}?cc=bg&lc=en`} />
    <link rel="alternate" hrefLang="fr-bf" href={`//${host}?cc=bf&lc=fr`} />
    <link rel="alternate" hrefLang="en-kh" href={`//${host}?cc=kh&lc=en`} />
    <link rel="alternate" hrefLang="fr-cm" href={`//${host}?cc=cm&lc=fr`} />
    <link rel="alternate" hrefLang="en-ca" href={`//${host}?cc=ca&lc=en`} />
    <link rel="alternate" hrefLang="fr-ca" href={`//${host}?cc=ca&lc=fr`} />
    <link rel="alternate" hrefLang="en-ky" href={`//${host}?cc=ky&lc=en`} />
    <link rel="alternate" hrefLang="fr-td" href={`//${host}?cc=td&lc=fr`} />
    <link rel="alternate" hrefLang="es-cl" href={`//${host}?cc=cl&lc=es`} />
    <link rel="alternate" hrefLang="zh-cn" href={`//${host}?cc=cn&lc=zh`} />
    <link rel="alternate" hrefLang="es-co" href={`//${host}?cc=co&lc=es`} />
    <link rel="alternate" hrefLang="fr-cd" href={`//${host}?cc=cd&lc=fr`} />
    <link rel="alternate" hrefLang="fr-cg" href={`//${host}?cc=cg&lc=fr`} />
    <link rel="alternate" hrefLang="es-cr" href={`//${host}?cc=cr&lc=es`} />
    <link rel="alternate" hrefLang="en-hr" href={`//${host}?cc=hr&lc=en`} />
    <link rel="alternate" hrefLang="en-cw" href={`//${host}?cc=cw&lc=en`} />
    <link rel="alternate" hrefLang="en-cy" href={`//${host}?cc=cy&lc=en`} />
    <link rel="alternate" hrefLang="en-cz" href={`//${host}?cc=cz&lc=en`} />
    <link rel="alternate" hrefLang="en-dm" href={`//${host}?cc=dm&lc=en`} />
    <link rel="alternate" hrefLang="en-dk" href={`//${host}?cc=dk&lc=en`} />
    <link rel="alternate" hrefLang="es-ec" href={`//${host}?cc=ec&lc=es`} />
    <link rel="alternate" hrefLang="en-eg" href={`//${host}?cc=eg&lc=en`} />
    <link rel="alternate" hrefLang="en-ee" href={`//${host}?cc=ee&lc=en`} />
    <link rel="alternate" hrefLang="en-et" href={`//${host}?cc=et&lc=en`} />
    <link rel="alternate" hrefLang="en-fi" href={`//${host}?cc=fi&lc=en`} />
    <link rel="alternate" hrefLang="fr-fr" href={`//${host}?cc=fr&lc=fr`} />
    <link rel="alternate" hrefLang="fr-ga" href={`//${host}?cc=ga&lc=fr`} />
    <link rel="alternate" hrefLang="de-de" href={`//${host}?cc=de&lc=de`} />
    <link rel="alternate" hrefLang="en-gh" href={`//${host}?cc=gh&lc=en`} />
    <link rel="alternate" hrefLang="en-gr" href={`//${host}?cc=gr&lc=en`} />
    <link rel="alternate" hrefLang="en-gd" href={`//${host}?cc=gd&lc=en`} />
    <link rel="alternate" hrefLang="en-gy" href={`//${host}?cc=gy&lc=en`} />
    <link rel="alternate" hrefLang="en-hk" href={`//${host}?cc=hk&lc=en`} />
    <link rel="alternate" hrefLang="en-hu" href={`//${host}?cc=hu&lc=en`} />
    <link rel="alternate" hrefLang="en-in" href={`//${host}?cc=in&lc=en`} />
    <link rel="alternate" hrefLang="en-id" href={`//${host}?cc=id&lc=en`} />
    <link rel="alternate" hrefLang="en-iq" href={`//${host}?cc=iq&lc=en`} />
    <link rel="alternate" hrefLang="en-ie" href={`//${host}?cc=ie&lc=en`} />
    <link rel="alternate" hrefLang="en-il" href={`//${host}?cc=il&lc=en`} />
    <link rel="alternate" hrefLang="it-it" href={`//${host}?cc=it&lc=it`} />
    <link rel="alternate" hrefLang="fr-ci" href={`//${host}?cc=ci&lc=fr`} />
    <link rel="alternate" hrefLang="en-jm" href={`//${host}?cc=jm&lc=en`} />
    <link rel="alternate" hrefLang="ja-jp" href={`//${host}?cc=jp&lc=ja`} />
    <link rel="alternate" hrefLang="en-jo" href={`//${host}?cc=jo&lc=en`} />
    <link rel="alternate" hrefLang="en-kz" href={`//${host}?cc=kz&lc=en`} />
    <link rel="alternate" hrefLang="en-ke" href={`//${host}?cc=ke&lc=en`} />
    <link rel="alternate" hrefLang="ko-kr" href={`//${host}?cc=kr&lc=ko`} />
    <link rel="alternate" hrefLang="en-kw" href={`//${host}?cc=kw&lc=en`} />
    <link rel="alternate" hrefLang="en-lv" href={`//${host}?cc=lv&lc=en`} />
    <link rel="alternate" hrefLang="en-lb" href={`//${host}?cc=lb&lc=en`} />
    <link rel="alternate" hrefLang="en-ly" href={`//${host}?cc=ly&lc=en`} />
    <link rel="alternate" hrefLang="en-lt" href={`//${host}?cc=lt&lc=en`} />
    <link rel="alternate" hrefLang="en-mw" href={`//${host}?cc=mw&lc=en`} />
    <link rel="alternate" hrefLang="en-my" href={`//${host}?cc=my&lc=en`} />
    <link rel="alternate" hrefLang="fr-mu" href={`//${host}?cc=mu&lc=fr`} />
    <link rel="alternate" hrefLang="es-mx" href={`//${host}?cc=mx&lc=es`} />
    <link rel="alternate" hrefLang="en-ms" href={`//${host}?cc=ms&lc=en`} />
    <link rel="alternate" hrefLang="fr-ma" href={`//${host}?cc=ma&lc=fr`} />
    <link rel="alternate" hrefLang="pt-mz" href={`//${host}?cc=mz&lc=pt`} />
    <link rel="alternate" hrefLang="en-na" href={`//${host}?cc=na&lc=en`} />
    <link rel="alternate" hrefLang="en-np" href={`//${host}?cc=np&lc=en`} />
    <link rel="alternate" hrefLang="en-nl" href={`//${host}?cc=nl&lc=en`} />
    <link rel="alternate" hrefLang="en-nz" href={`//${host}?cc=nz&lc=en`} />
    <link rel="alternate" hrefLang="fr-ne" href={`//${host}?cc=ne&lc=fr`} />
    <link rel="alternate" hrefLang="en-ng" href={`//${host}?cc=ng&lc=en`} />
    <link rel="alternate" hrefLang="en-no" href={`//${host}?cc=no&lc=en`} />
    <link rel="alternate" hrefLang="en-om" href={`//${host}?cc=om&lc=en`} />
    <link rel="alternate" hrefLang="en-pk" href={`//${host}?cc=pk&lc=en`} />
    <link rel="alternate" hrefLang="es-py" href={`//${host}?cc=py&lc=es`} />
    <link rel="alternate" hrefLang="es-pe" href={`//${host}?cc=pe&lc=es`} />
    <link rel="alternate" hrefLang="en-ph" href={`//${host}?cc=ph&lc=en`} />
    <link rel="alternate" hrefLang="pl-pl" href={`//${host}?cc=pl&lc=pl`} />
    <link rel="alternate" hrefLang="en-pt" href={`//${host}?cc=pt&lc=en`} />
    <link rel="alternate" hrefLang="en-qa" href={`//${host}?cc=qa&lc=en`} />
    <link rel="alternate" hrefLang="en-ro" href={`//${host}?cc=ro&lc=en`} />
    <link rel="alternate" hrefLang="ru-ru" href={`//${host}?cc=ru&lc=ru`} />
    <link rel="alternate" hrefLang="en-kn" href={`//${host}?cc=kn&lc=en`} />
    <link rel="alternate" hrefLang="en-lc" href={`//${host}?cc=lc&lc=en`} />
    <link rel="alternate" hrefLang="en-vc" href={`//${host}?cc=vc&lc=en`} />
    <link rel="alternate" hrefLang="en-sa" href={`//${host}?cc=sa&lc=en`} />
    <link rel="alternate" hrefLang="fr-sn" href={`//${host}?cc=sn&lc=fr`} />
    <link rel="alternate" hrefLang="en-rs" href={`//${host}?cc=rs&lc=en`} />
    <link rel="alternate" hrefLang="fr-sc" href={`//${host}?cc=sc&lc=fr`} />
    <link rel="alternate" hrefLang="en-sl" href={`//${host}?cc=sl&lc=en`} />
    <link rel="alternate" hrefLang="en-sg" href={`//${host}?cc=sg&lc=en`} />
    <link rel="alternate" hrefLang="en-sk" href={`//${host}?cc=sk&lc=en`} />
    <link rel="alternate" hrefLang="en-si" href={`//${host}?cc=si&lc=en`} />
    <link rel="alternate" hrefLang="en-za" href={`//${host}?cc=za&lc=en`} />
    <link rel="alternate" hrefLang="es-es" href={`//${host}?cc=es&lc=es`} />
    <link rel="alternate" hrefLang="en-lk" href={`//${host}?cc=lk&lc=en`} />
    <link rel="alternate" hrefLang="en-sr" href={`//${host}?cc=sr&lc=en`} />
    <link rel="alternate" hrefLang="en-se" href={`//${host}?cc=se&lc=en`} />
    <link rel="alternate" hrefLang="fr-ch" href={`//${host}?cc=ch&lc=fr`} />
    <link rel="alternate" hrefLang="de-ch" href={`//${host}?cc=ch&lc=de`} />
    <link rel="alternate" hrefLang="zh-tw" href={`//${host}?cc=tw&lc=zh`} />
    <link rel="alternate" hrefLang="en-tz" href={`//${host}?cc=tz&lc=en`} />
    <link rel="alternate" hrefLang="en-th" href={`//${host}?cc=th&lc=en`} />
    <link rel="alternate" hrefLang="en-tt" href={`//${host}?cc=tt&lc=en`} />
    <link rel="alternate" hrefLang="fr-tn" href={`//${host}?cc=tn&lc=fr`} />
    <link rel="alternate" hrefLang="tr-tr" href={`//${host}?cc=tr&lc=tr`} />
    <link rel="alternate" hrefLang="en-ye" href={`//${host}?cc=ye&lc=en`} />
    <link rel="alternate" hrefLang="en-tc" href={`//${host}?cc=tc&lc=en`} />
    <link rel="alternate" hrefLang="en-ua" href={`//${host}?cc=ua&lc=en`} />
    <link rel="alternate" hrefLang="en-ug" href={`//${host}?cc=ug&lc=en`} />
    <link rel="alternate" hrefLang="en-ae" href={`//${host}?cc=ae&lc=en`} />
    <link rel="alternate" hrefLang="en-gb" href={`//${host}?cc=uk&lc=en`} />
    <link rel="alternate" hrefLang="es-uy" href={`//${host}?cc=uy&lc=es`} />
    <link rel="alternate" hrefLang="en-uz" href={`//${host}?cc=uz&lc=en`} />
    <link rel="alternate" hrefLang="es-ve" href={`//${host}?cc=ve&lc=es`} />
    <link rel="alternate" hrefLang="en-vn" href={`//${host}?cc=vn&lc=en`} />
    <link rel="alternate" hrefLang="en-zm" href={`//${host}?cc=zm&lc=en`} />
    <link rel="alternate" hrefLang="en-zw" href={`//${host}?cc=zw&lc=en`} />
  </>
);

AltLangs.propTypes = {
  host: PropTypes.string.isRequired,
};

export default AltLangs;
