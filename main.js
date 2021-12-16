      const roadarea = document.querySelector('.road');
      let player={step:7};
      let keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};
      document.addEventListener('keydown',keyDown);
      document.addEventListener('keyup',keyUp);

      function keyDown(ev)
      {
          keys[ev.key]=true;
      }
      function keyUp(ev)
      {
          keys[ev.key]=false;
      }
      function movelines()
      {
          let roadlines=document.querySelectorAll('.line');
          roadlines.forEach(function(item){
              if(item.y>=900)//700=>900
              {
                  item.y=item.y-895;//750=>895
              }
              item.y=item.y+player.step;
              item.style.top=item.y+'px';
          })
      }
      function movevehicles(playercar)
      {
          let vehicles=document.querySelectorAll('.vehicle');
          vehicles.forEach(function(item)
          {
              if(isCollide(playercar,item))
              {
                player.start=false;
                let a=document.getElementById('end');
                a.style.display="block";
                
              }
              if(item.y>900)
              {
                  item.y=-100;
                  item.style.left=Math.floor(Math.random()*350)+'px';
              }
              item.y=item.y+player.step;
              item.style.top=item.y+'px';
          })
      }
      function restartFun()
      {
          player.start=true;
          window.requestAnimationFrame(playarea);
      }
      function isCollide(a,b)
        {
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();
    
            return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom ) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
        }


      function playarea()
      {
          let playercar=document.querySelector('.car');
          let road=roadarea.getBoundingClientRect();
          if(player.start)
          {
              movelines();
              movevehicles(playercar);
              if(keys.ArrowUp && player.y>(road.top+80))//80 is car height
              {
                  player.y=player.y-player.step;
              }
              if(keys.ArrowDown && player.y<(road.bottom-80))
              {
                player.y=player.y+player.step;
              }
              if(keys.ArrowLeft && player.x>0)
              {
                player.x=player.x-player.step;
              }
              if(keys.ArrowRight && player.x<(road.width-78)) // widthOfCar(50)+border(2*14) 
              {
                player.x=player.x+player.step;
              }
              playercar.style.top=player.y+'px';
              playercar.style.left=player.x+'px';
              window.requestAnimationFrame(playarea);
          }
      }


      function init() 
      {
          player.start=true;
          window.requestAnimationFrame(playarea);
        
        let playercar = document.createElement('div');
        playercar.setAttribute('class', 'car');
        roadarea.appendChild(playercar);

        player.x=playercar.offsetLeft;
        player.y=playercar.offsetTop;



        //repeated roadlines
        for(x=0;x<7;x++){
        let roadlines = document.createElement('div');
        roadlines.setAttribute('class', 'line');
        roadlines.y=x*150;
        roadlines.style.top=roadlines.y+'px';
        roadarea.appendChild(roadlines);
        }

        //vehicles in road
        for(x=0;x<3;x++)
        {
            let vehicles=document.createElement('div');
            vehicles.setAttribute('class','vehicle');
            vehicles.y=((x+1)*300)* -1;
            vehicles.style.top=vehicles.y+'px';
            vehicles.style.left=Math.floor(Math.random() * 350)+'px';
            roadarea.appendChild(vehicles);
        }
      }
      init();