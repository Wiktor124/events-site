function autoGalleryContainerHeight() {
	const headerHeight = document.querySelector('#header').offsetHeight;
	const mainContainer = document.querySelector('#main-gallery');
	mainContainer.style.height = `calc(100vh - ${headerHeight}px)`;
	mainContainer.style.overflow = 'auto';
}
export default autoGalleryContainerHeight;
