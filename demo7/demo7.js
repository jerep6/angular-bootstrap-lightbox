angular.module('demo7', ['bootstrapLightbox', 'ngPhotosphere']);

angular.module('demo7').controller('GalleryCtrl', function ($scope, Lightbox) {
  // Initialise photospehere options
  Lightbox.photoSphereOptions = {
    loading_img: 'http://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
    navbar: 'autorotate zoom caption fullscreen',
    default_fov: 80
  };

  $scope.images = [
    {
      'type': 'photosphere',
      'url': 'Bryce-Canyon-By-Jess-Beauchemin.jpg',
      'thumbUrl': 'Bryce-Canyon-By-Jess-Beauchemin-thumb.jpg'
    },
    {
      'url': 'http://i.imgur.com/9RyWebb.jpg',
      'thumbUrl': 'http://i.imgur.com/9RyWebbb.jpg'
    }
  ];

  $scope.Lightbox = Lightbox;
});

angular.module('ngPhotosphere', [])
  .directive('photosphere', function($timeout) {
    return {
      restrict: 'A',
      template: '',
      transclude: true,
      link: function link(scope, element, attrs, controller, transcludeFn) {
        // Add attr options to user specific options
        var options = angular.extend({}, scope.psOptions, {
          panorama: attrs.psSrc,
          container: element[0],
          caption: attrs.psCaption
        });
        $timeout(function() {
          var p = new PhotoSphereViewer(options);
        }, 300);
      },
      scope: {
        psOptions: '=psOptions'
      }
    };
  });
