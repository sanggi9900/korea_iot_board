package com.korit.board_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, name = "author_id")
    private Long authorId;

    @Builder.Default // 기본으로 만들어진다
    @OneToMany(mappedBy = "aricle", cascade = CascadeType.ALL, orphanRemoval = true) // 비어 있어도 된다, 게시글이 없으면 없어진다 .연관된 댓글 모두
    private List<Comment> comments = new ArrayList<>();
}
