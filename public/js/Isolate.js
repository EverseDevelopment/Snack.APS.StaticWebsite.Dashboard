function isolateSel(){
    viewer.clearThemingColors();
    const selSet = viewer.getSelection();
    viewer.isolate(selSet);
}