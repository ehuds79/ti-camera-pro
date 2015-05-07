        public void surfaceChanged(SurfaceHolder previewHolder, int format, int width,
                int height) {
            if (isPreviewing){ 
                camera.stopPreview(); 
            }

            p = camera.getParameters();
            p.setPreviewSize(sizes.get(0).width, sizes.get(0).height);
            p.setColorEffect(effect); 



            if (p.isZoomSupported() && p.isSmoothZoomSupported()) {
                //most phones
                maxZoomLevel = p.getMaxZoom();

                zoomControls.setIsZoomInEnabled(true);
                zoomControls.setIsZoomOutEnabled(true);

                zoomControls.setOnZoomInClickListener(new OnClickListener() {
                    public void onClick(View v) {
                        if (currentZoomLevel < maxZoomLevel) {
                            currentZoomLevel++;
                            camera.startSmoothZoom(currentZoomLevel);

                        }
                    }
                });

                zoomControls.setOnZoomOutClickListener(new OnClickListener() {
                    public void onClick(View v) {
                        if (currentZoomLevel > 0) {
                            currentZoomLevel--;
                            camera.startSmoothZoom(currentZoomLevel);
                        }
                    }
                });
            } else if (p.isZoomSupported() && !p.isSmoothZoomSupported()){
                //stupid HTC phones
                maxZoomLevel = p.getMaxZoom();

                zoomControls.setIsZoomInEnabled(true);
                zoomControls.setIsZoomOutEnabled(true);

                zoomControls.setOnZoomInClickListener(new OnClickListener() {
                    public void onClick(View v) {
                        if (currentZoomLevel < maxZoomLevel) {
                            currentZoomLevel++;
                            p.setZoom(currentZoomLevel);
                            camera.setParameters(p);

                        }
                    }
                });

                zoomControls.setOnZoomOutClickListener(new OnClickListener() {
                    public void onClick(View v) {
                        if (currentZoomLevel > 0) {
                            currentZoomLevel--;
                            p.setZoom(currentZoomLevel);
                            camera.setParameters(p);
                        }
                    }
                });
            }else{
                //no zoom on phone
                zoomControls.setVisibility(View.GONE);
            }

            camera.setParameters(p); 

            try {
                camera.setPreviewDisplay(previewHolder); 
            } // end try
            catch (IOException e) {
                Log.v(TAG, e.toString());
            } // end catch

            camera.startPreview(); // begin the preview
            isPreviewing = true;
        } // end method surfaceChanged