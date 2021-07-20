import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { PostExtended } from 'src/core/models/models'

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent implements OnInit {
  @Input() posts: PostExtended[] = []
  @Input() isLoading: boolean = false
  @Input() set searchTerm(value: string) {
    this.searchWords = value ? value.split(' ') : null
  }

  public searchWords: string[] | null = []

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToPost(post: PostExtended): void {
    this.router.navigateByUrl(`/posts/${post.id}`, { state: post })
  }
}
