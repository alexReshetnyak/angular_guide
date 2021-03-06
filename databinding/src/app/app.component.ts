import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CockpitComponent } from './cockpit/cockpit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public serverElements = [{type: 'server', name: 'Testserver', content: 'Just a test!'}];
  @ViewChild(CockpitComponent, {static: true}) private childCockpitComponent: CockpitComponent;

  public ngAfterViewInit(): void {
    console.log('Child Cockpit Component', this.childCockpitComponent);
  }

  public onServerAdded(serverData: {serverName: string, serverContent: string}): void {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }


  public onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}): void {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  public onChangeFirst(): void {
    this.serverElements[0].name = 'Changed!';
  }

  public onDestroyFirst(): void {
    this.serverElements.splice(0, 1);
  }
}
