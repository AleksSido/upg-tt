import {EventImage} from '../app/event-types';

function findAppropriateSizeImg(imgArr:EventImage[], min:number, opt:number, max:number) {
  const optImg = imgArr.find((item) => item.width >= opt && item.width <= max);
  if (optImg && optImg.url) {
    return optImg.url;
  }
  const lessOpt = imgArr.find((item) => item.width < opt && item.width > min);
  if (lessOpt && lessOpt.url) {
    return lessOpt.url;
  }
  const filteredImgArr = imgArr.filter((item) => item.width > max);
  const sortedImgArr = filteredImgArr.sort((a, b) => a.width - b.width);
  if (sortedImgArr[0] && sortedImgArr[0].url) {
    return sortedImgArr[0].url;
  } else {
    return '';
  }
}

type ImgSources = {
  src: string;
  srcSet: string;
};

export default function getSourcesForImg(maxWidth:number, images:EventImage[]):ImgSources{
  const possibleDeviation = 0.2;
  const imgSrcIndices = [1, 2, 3];
  const srcSetArr = imgSrcIndices.map(item => {
    const min = (item - possibleDeviation) * maxWidth;
    const opt = item * maxWidth;
    const max = (item + possibleDeviation) * maxWidth;
    return findAppropriateSizeImg(images, min, opt, max) + ` ${item}x`;
  });
  const srcSet = srcSetArr.length ? srcSetArr.join(', ') : '';
  const src = srcSetArr.length ? srcSetArr[0].replace(' 1x', '') : '';
  return { src, srcSet };
}


