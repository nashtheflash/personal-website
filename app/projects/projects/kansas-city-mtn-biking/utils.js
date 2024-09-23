export function getAreaIndex(data, area){
    const areaIndex = data.map(area => area.name).indexOf(area);
    const areaData = areaIndex <= 0 ? 0 : area;
    return areaData;
}
