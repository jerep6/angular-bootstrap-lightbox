---
title: "Demo 7: Photosphere"
layout: demo
module: demo7
---

The first item is a photosphere image . The second is an traditional image. 
In order to show photo sphere, you have to provide a *photosphere* named directive. An lightweight directive is present in this demo.

Directive parameters :
 * **ps-src** = source of the image 
 * **ps-caption** = title of the image 
 * **ps-options** = object which contains all the options to initialise the photosphere viewer 

{% raw %}
<ul class="gallery gallery7" ng-controller="GalleryCtrl">
  <li ng-repeat="image in images">
    <a ng-click="Lightbox.openModal(images, $index)">
      <img ng-src="{{image.thumbUrl}}" class="img-thumbnail">
    </a>
  </li>
</ul>
{% endraw %}

### `index.html`

{% highlight html %}
{% raw %}
<ul class="gallery gallery7" ng-controller="GalleryCtrl">
  <li ng-repeat="image in images">
    <a ng-click="Lightbox.openModal(images, $index)">
      <img ng-src="{{'\{\{image.thumbUrl\}\}'}}" class="img-thumbnail">
    </a>
  </li>
</ul>
{% endraw %}
{% endhighlight %}

### `demo7.js`

{% highlight js %}
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

{% endhighlight %}
