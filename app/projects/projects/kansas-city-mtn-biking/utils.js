export function getAreaIndex(data, area){
    const areaIndex = data.map(area => area.name).indexOf(area);
    return areaIndex;
}
