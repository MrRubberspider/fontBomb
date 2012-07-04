// Generated by CoffeeScript 1.3.1
(function() {
  var Explosion,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Explosion = (function() {

    Explosion.name = 'Explosion';

    function Explosion() {
      this.tick = __bind(this.tick, this);

      this.dropBomb = __bind(this.dropBomb, this);

      var char, _ref,
        _this = this;
      this.bombs = [];
      this.body = document.getElementsByTagName("body")[0];
      if ((_ref = this.body) != null) {
        _ref.onclick = function(event) {
          return _this.dropBomb(event);
        };
      }
      this.body.addEventListener("touchmove", function(event) {
        _this.touchMoveCount || (_this.touchMoveCount = 0);
        _this.touchMoveCount++;
        return _this.touchEvent = event;
      });
      this.body.addEventListener("touchend", function(event) {
        if (_this.touchMoveCount < 3) {
          _this.dropBomb(_this.touchEvent);
        }
        return _this.touchMoveCount = 0;
      });
      this.explosifyNodes(this.body.childNodes);
      this.chars = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = document.getElementsByTagName('particle');
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          char = _ref1[_i];
          _results.push(new Particle(char, this.body));
        }
        return _results;
      }).call(this);
      this.tick();
    }

    Explosion.prototype.explosifyNodes = function(nodes) {
      var node, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        _results.push(this.explosifyNode(node));
      }
      return _results;
    };

    Explosion.prototype.explosifyNode = function(node) {
      var newNode;
      switch (node.nodeType) {
        case 1:
          return this.explosifyNodes(node.childNodes);
        case 3:
          if (!/^\s*$/.test(node.nodeValue)) {
            if (node.parentNode.childNodes.length === 1) {
              return node.parentNode.innerHTML = this.explosifyText(node.nodeValue);
            } else {
              newNode = document.createElement("particles");
              newNode.innerHTML = this.explosifyText(node.nodeValue);
              return node.parentNode.replaceChild(newNode, node);
            }
          }
      }
    };

    Explosion.prototype.explosifyText = function(string) {
      var char, chars, index;
      chars = (function() {
        var _i, _len, _ref, _results;
        _ref = string.split('');
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          char = _ref[index];
          if (!/^\s*$/.test(char)) {
            _results.push("<particle style='display:inline-block;'>" + char + "</particle>");
          } else {
            _results.push('&nbsp;');
          }
        }
        return _results;
      })();
      chars = chars.join('');
      chars = (function() {
        var _i, _len, _ref, _results;
        _ref = chars.split('&nbsp;');
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          char = _ref[index];
          if (!/^\s*$/.test(char)) {
            _results.push("<word style='white-space:nowrap'>" + char + "</word>");
          } else {
            _results.push(char);
          }
        }
        return _results;
      })();
      return chars.join(' ');
    };

    Explosion.prototype.dropBomb = function(event) {
      var pos;
      pos = window.findClickPos(event);
      return this.bombs.push(new Bomb(pos.x, pos.y));
    };

    Explosion.prototype.tick = function() {
      var bomb, char, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      _ref = this.bombs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bomb = _ref[_i];
        if (bomb.state === 'explose') {
          bomb.exploded();
          this.blast = bomb.pos;
        }
      }
      if (this.blast != null) {
        _ref1 = this.chars;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          char = _ref1[_j];
          char.tick(this.blast);
        }
        this.blast = null;
      } else {
        _ref2 = this.chars;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          char = _ref2[_k];
          char.tick();
        }
      }
      return requestAnimationFrame(this.tick);
    };

    return Explosion;

  })();

  new Explosion();

}).call(this);
